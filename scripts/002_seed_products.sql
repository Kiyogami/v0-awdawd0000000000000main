-- Seed products
INSERT INTO products (name, description, price, original_price, image_url, category, sizes, in_stock, featured) VALUES
('Classic Black Hoodie', 'Premium cotton hoodie z haftem logo Prascy Bandyci', 299.00, 349.00, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', 'hoodies', ARRAY['S', 'M', 'L', 'XL'], true, true),
('Gold Edition Tee', 'Limitowana edycja t-shirtu ze zlotym nadrukiem', 149.00, NULL, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 't-shirts', ARRAY['S', 'M', 'L', 'XL', 'XXL'], true, true),
('Street Joggers', 'Wygodne spodnie dresowe z kieszeniami cargo', 249.00, 299.00, 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800', 'pants', ARRAY['S', 'M', 'L', 'XL'], true, false),
('Bandyci Cap', 'Snapback z wyhaftowanym logo', 89.00, NULL, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', 'accessories', ARRAY['ONE SIZE'], true, true),
('Winter Bomber', 'Ciepla kurtka bomber na zimowe miesiace', 449.00, 549.00, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', 'jackets', ARRAY['S', 'M', 'L', 'XL'], true, true),
('Oversized Logo Tee', 'Luźny krój z dużym logo na plecach', 129.00, NULL, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', 't-shirts', ARRAY['M', 'L', 'XL', 'XXL'], true, false),
('Chain Necklace', 'Stalowy łańcuch z zawieszką PB', 199.00, NULL, 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800', 'accessories', ARRAY['ONE SIZE'], true, false),
('Cargo Shorts', 'Szorty cargo na letnie dni', 179.00, 219.00, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800', 'pants', ARRAY['S', 'M', 'L', 'XL'], true, false),
('Zip-Up Hoodie', 'Rozpinana bluza z kapturem i haftem', 329.00, NULL, 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800', 'hoodies', ARRAY['S', 'M', 'L', 'XL'], true, false),
('Beanie Hat', 'Czapka zimowa z logo', 69.00, NULL, 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800', 'accessories', ARRAY['ONE SIZE'], true, false);
