-- Create role enum
CREATE TYPE public.app_role AS ENUM ('hospital', 'government', 'ngo', 'public');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create user_roles table (CRITICAL: separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create alerts table (for surge predictions)
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES auth.users(id) NOT NULL,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  predicted_cases INTEGER NOT NULL,
  confidence DECIMAL NOT NULL,
  factors JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create problems table (for identified issues)
CREATE TABLE public.problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID REFERENCES public.alerts(id) ON DELETE CASCADE,
  problem_type TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create actions table (for recommended actions)
CREATE TABLE public.actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  description TEXT NOT NULL,
  assigned_to TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create hospital_resources table
CREATE TABLE public.hospital_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES auth.users(id) NOT NULL,
  resource_name TEXT NOT NULL,
  current_stock INTEGER NOT NULL DEFAULT 0,
  required INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create resource_allocations table
CREATE TABLE public.resource_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES auth.users(id) NOT NULL,
  to_hospital_id UUID REFERENCES auth.users(id) NOT NULL,
  resource_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT DEFAULT 'allocated',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create ngo_requests table
CREATE TABLE public.ngo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  urgency TEXT NOT NULL,
  required_volunteers INTEGER,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create ngo_pledges table
CREATE TABLE public.ngo_pledges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID REFERENCES auth.users(id) NOT NULL,
  request_id UUID REFERENCES public.ngo_requests(id) ON DELETE CASCADE,
  volunteers_assigned INTEGER NOT NULL,
  status TEXT DEFAULT 'in-progress',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospital_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngo_pledges ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for alerts
CREATE POLICY "Hospitals can view own alerts" ON public.alerts FOR SELECT USING (public.has_role(auth.uid(), 'hospital') AND auth.uid() = hospital_id);
CREATE POLICY "Government can view all alerts" ON public.alerts FOR SELECT USING (public.has_role(auth.uid(), 'government'));
CREATE POLICY "Hospitals can create alerts" ON public.alerts FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'hospital') AND auth.uid() = hospital_id);

-- RLS Policies for problems
CREATE POLICY "All authenticated can view problems" ON public.problems FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for actions
CREATE POLICY "All authenticated can view actions" ON public.actions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "NGOs can update actions" ON public.actions FOR UPDATE USING (public.has_role(auth.uid(), 'ngo'));

-- RLS Policies for hospital_resources
CREATE POLICY "Hospitals can manage own resources" ON public.hospital_resources FOR ALL USING (auth.uid() = hospital_id);
CREATE POLICY "Government can view all resources" ON public.hospital_resources FOR SELECT USING (public.has_role(auth.uid(), 'government'));

-- RLS Policies for resource_allocations
CREATE POLICY "All authenticated can view allocations" ON public.resource_allocations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Government can create allocations" ON public.resource_allocations FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'government'));

-- RLS Policies for ngo_requests
CREATE POLICY "All authenticated can view requests" ON public.ngo_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Government can create requests" ON public.ngo_requests FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'government'));

-- RLS Policies for ngo_pledges
CREATE POLICY "NGOs can view own pledges" ON public.ngo_pledges FOR SELECT USING (public.has_role(auth.uid(), 'ngo'));
CREATE POLICY "NGOs can create pledges" ON public.ngo_pledges FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'ngo'));
CREATE POLICY "NGOs can update own pledges" ON public.ngo_pledges FOR UPDATE USING (public.has_role(auth.uid(), 'ngo') AND auth.uid() = ngo_id);

-- Trigger function for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger for auto-creating profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.problems;
ALTER PUBLICATION supabase_realtime ADD TABLE public.actions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.resource_allocations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ngo_requests;