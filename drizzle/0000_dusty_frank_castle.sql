CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`intent` text NOT NULL,
	`product` text NOT NULL,
	`quantity` text NOT NULL,
	`packaging` text NOT NULL,
	`market` text NOT NULL,
	`message` text NOT NULL,
	`name` text NOT NULL,
	`company` text NOT NULL,
	`country` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`language` text NOT NULL
);
