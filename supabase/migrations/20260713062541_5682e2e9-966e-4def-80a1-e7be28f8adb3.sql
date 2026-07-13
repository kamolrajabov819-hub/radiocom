-- Lock down storage.objects for the private catalog-other-photos bucket.
-- No client reads/writes; only service_role (admin) can manage files.

CREATE POLICY "catalog_other_photos_no_client_select"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'catalog-other-photos' AND false);

CREATE POLICY "catalog_other_photos_no_client_insert"
ON storage.objects FOR INSERT
TO authenticated, anon
WITH CHECK (bucket_id = 'catalog-other-photos' AND false);

CREATE POLICY "catalog_other_photos_no_client_update"
ON storage.objects FOR UPDATE
TO authenticated, anon
USING (bucket_id = 'catalog-other-photos' AND false)
WITH CHECK (bucket_id = 'catalog-other-photos' AND false);

CREATE POLICY "catalog_other_photos_no_client_delete"
ON storage.objects FOR DELETE
TO authenticated, anon
USING (bucket_id = 'catalog-other-photos' AND false);