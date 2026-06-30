-- The Card Bar initial schema

CREATE TYPE user_role AS ENUM ('customer', 'admin');
CREATE TYPE card_type AS ENUM ('basic', 'metal');
CREATE TYPE order_status AS ENUM (
  'new_order', 'design_pending', 'in_review', 'landing_page_build',
  'automation_build', 'ready_to_encode', 'ready_to_ship', 'shipped', 'completed'
);
CREATE TYPE template_type AS ENUM (
  'classic-contact', 'link-lounge', 'lead-generator', 'appointment-setter',
  'ai-concierge', 'event-networker', 'creator-pour', 'service-menu',
  'restaurant-bar', 'executive-reserve'
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  role user_role DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE card_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  card_type card_type NOT NULL DEFAULT 'basic',
  price NUMERIC(10,2) NOT NULL DEFAULT 30,
  hosting_subscription_status TEXT DEFAULT 'inactive',
  ai_addon_status TEXT DEFAULT 'inactive',
  ai_addon_enabled BOOLEAN DEFAULT FALSE,
  design_upload_url TEXT,
  logo_url TEXT,
  headshot_url TEXT,
  selected_template template_type,
  automation_request TEXT,
  selected_automations JSONB DEFAULT '[]',
  order_status order_status DEFAULT 'new_order',
  shipping_address JSONB,
  order_notes TEXT,
  design_style TEXT,
  profile_data JSONB,
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  tracking_number TEXT,
  mockup_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  card_order_id UUID REFERENCES card_orders(id) ON DELETE CASCADE,
  template_type template_type NOT NULL DEFAULT 'classic-contact',
  page_slug TEXT UNIQUE NOT NULL,
  profile_name TEXT,
  company_name TEXT,
  bio TEXT,
  links JSONB DEFAULT '[]',
  contact_buttons JSONB DEFAULT '[]',
  lead_form_fields JSONB DEFAULT '[]',
  custom_sections JSONB DEFAULT '{}',
  theme_colors JSONB DEFAULT '["#C9A962","#0A0A0B"]',
  published_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  card_order_id UUID REFERENCES card_orders(id) ON DELETE CASCADE,
  automation_type TEXT NOT NULL,
  automation_description TEXT,
  connected_tool TEXT,
  webhook_url_placeholder TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  card_order_id UUID REFERENCES card_orders(id) ON DELETE CASCADE,
  agent_type TEXT DEFAULT 'chat',
  agent_name TEXT DEFAULT 'The Cardologist',
  agent_description TEXT,
  knowledge_base TEXT,
  status TEXT DEFAULT 'inactive',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id UUID REFERENCES landing_pages(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'tap',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tap_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_order_id UUID REFERENCES card_orders(id) ON DELETE SET NULL,
  landing_page_id UUID REFERENCES landing_pages(id) ON DELETE SET NULL,
  tap_time TIMESTAMPTZ DEFAULT NOW(),
  device_type TEXT,
  referrer TEXT,
  clicked_cta TEXT
);

CREATE TABLE support_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE tap_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users read own orders" ON card_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own orders" ON card_orders FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users read own landing pages" ON landing_pages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Public read published pages" ON landing_pages FOR SELECT USING (published_status = TRUE);
CREATE POLICY "Users manage own landing pages" ON landing_pages FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users read own automations" ON automations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own ai addons" ON ai_addons FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own leads" ON leads FOR SELECT USING (
  landing_page_id IN (SELECT id FROM landing_pages WHERE user_id = auth.uid())
);
CREATE POLICY "Anyone insert leads" ON leads FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users read own analytics" ON tap_analytics FOR SELECT USING (
  card_order_id IN (SELECT id FROM card_orders WHERE user_id = auth.uid())
);
CREATE POLICY "Anyone insert analytics" ON tap_analytics FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users manage own support" ON support_requests FOR ALL USING (auth.uid() = user_id);

-- Admin policies
CREATE POLICY "Admin full access orders" ON card_orders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access landing pages" ON landing_pages FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access support" ON support_requests FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
