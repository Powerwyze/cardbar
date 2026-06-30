-- Storage buckets for The Card Bar
INSERT INTO storage.buckets (id, name, public) VALUES
  ('logos', 'logos', true),
  ('artwork', 'artwork', true),
  ('headshots', 'headshots', true),
  ('mockups', 'mockups', false)
ON CONFLICT (id) DO NOTHING;

-- Public read for logos, artwork, headshots
CREATE POLICY "Public read logos" ON storage.objects FOR SELECT USING (bucket_id = 'logos');
CREATE POLICY "Public read artwork" ON storage.objects FOR SELECT USING (bucket_id = 'artwork');
CREATE POLICY "Public read headshots" ON storage.objects FOR SELECT USING (bucket_id = 'headshots');

-- Authenticated upload
CREATE POLICY "Auth upload logos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.role() = 'authenticated');
CREATE POLICY "Auth upload artwork" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'artwork' AND auth.role() = 'authenticated');
CREATE POLICY "Auth upload headshots" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'headshots' AND auth.role() = 'authenticated');
CREATE POLICY "Admin upload mockups" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'mockups' AND auth.role() = 'authenticated');
