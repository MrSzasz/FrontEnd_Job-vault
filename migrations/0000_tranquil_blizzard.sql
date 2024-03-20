CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`position` text NOT NULL,
	`positionLink` text NOT NULL,
	`company` text NOT NULL,
	`description` text NOT NULL,
	`requirements` text NOT NULL,
	`extra` text,
	`date` text NOT NULL,
	`cv` text,
	`letter` text,
	`userEmail` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `jobs_id_unique` ON `jobs` (`id`);