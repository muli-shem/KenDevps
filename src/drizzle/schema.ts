import { pgTable, serial, varchar, text, integer, timestamp, boolean, foreignKey, date } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
// Users Table: Stores all user-related information
export const users = pgTable('users', {
  id: serial('id').primaryKey(), // Unique identifier for each user
  username: varchar('username', { length: 50 }).notNull().unique(), // Username of the user
  email: varchar('email', { length: 100 }).notNull().unique(), // Email address of the user
  password_hash: varchar('password_hash', { length: 256 }).notNull(), // Hashed password for secure authentication
  profile_photo: varchar('profile_photo', { length: 255 }).notNull(), // Profile photo URL
  location: varchar('location', { length: 100 }).notNull(), // Geographical location of the user (county/ward)
  created_at: timestamp('created_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the user was created
  updated_at: timestamp('updated_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the user was last updated
});

// Leaders Table: Stores information about various leaders
export const leaders = pgTable('leaders', {
  id: serial('id').primaryKey(), // Unique identifier for each leader
  name: varchar('name', { length: 100 }).notNull(), // Name of the leader
  position: varchar('position', { length: 50 }).notNull(), // Position of the leader (e.g., MCA, Governor, Senator)
  county: varchar('county', { length: 50 }).notNull(), // County that the leader represents
  sub_county: varchar('sub_county', { length: 50 }).notNull(), // Sub-county that the leader represents
  ward: varchar('ward', { length: 50 }).notNull(), // Ward that the leader represents
  manifesto: text('manifesto').notNull(), // Manifesto details of the leader
  photo_url: varchar('photo_url', { length: 255 }).notNull(), // Photo URL of the leader
  created_at: timestamp('created_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the leader was added
});

// Leader Communications Table: Stores messages and announcements from leaders to their constituents
export const leader_communications = pgTable('leader_communications', {
  id: serial('id').primaryKey(), // Unique identifier for each communication
  leader_id: integer('leader_id').references(() => leaders.id), // Foreign key referencing the leader
  title: varchar('title', { length: 255 }).notNull(), // Title of the communication
  message: text('message').notNull(), // Detailed message content
  target_county: varchar('target_county', { length: 50 }).notNull(), // County targeted by the communication
  target_sub_county: varchar('target_sub_county', { length: 50 }).notNull(), // Sub-county targeted by the communication
  target_ward: varchar('target_ward', { length: 50 }).notNull(), // Ward targeted by the communication
  is_national: boolean('is_national').default(false), // Flag to indicate if the communication is for the entire nation
  created_at: timestamp('created_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the communication was created
  updated_at: timestamp('updated_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the communication was last updated
  status: varchar('status', { length: 50 }).default('active'), // Status of the communication (e.g., active, archived)
});

// Government Projects Table: Stores information about government projects
export const government_projects = pgTable('government_projects', {
  id: serial('id').primaryKey(), // Unique identifier for each project
  title: varchar('title', { length: 255 }).notNull(), // Title of the project
  description: text('description').notNull(), // Detailed description of the project
  responsible_officer: varchar('responsible_officer', { length: 100 }).notNull(), // Officer or department responsible for the project
  status: varchar('status', { length: 50 }).default('ongoing'), // Current status of the project (e.g., ongoing, completed, stalled)
  start_date: date('start_date').notNull(), // Project start date
  end_date: date('end_date').notNull(), // Project end date (if applicable)
  county: varchar('county', { length: 50 }).notNull(), // County where the project is taking place
  sub_county: varchar('sub_county', { length: 50 }).notNull(), // Sub-county where the project is located
  ward: varchar('ward', { length: 50 }).notNull(), // Ward where the project is located
  budget: integer('budget').notNull(), // Budget allocated for the project
  progress_percentage: integer('progress_percentage').default(0), // Progress of the project in percentage
  media_url: varchar('media_url', { length: 255 }).notNull(), // URL for project-related media (e.g., photos, videos)
  created_at: timestamp('created_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the project was posted
  updated_at: timestamp('updated_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the project was last updated
});

// Media Files Table: Stores media files uploaded by users or leaders
export const media_files = pgTable('media_files', {
  id: serial('id').primaryKey(), // Unique identifier for each media file
  file_url: varchar('file_url', { length: 255 }).notNull(), // URL of the media file
  file_type: varchar('file_type', { length: 50 }).notNull(), // Type of the file (e.g., image, video)
  uploaded_by: integer('uploaded_by').references(() => users.id), // User who uploaded the media
  leader_id: integer('leader_id').references(() => leaders.id).notNull(), // Optional foreign key referencing the leader
  project_id: integer('project_id').references(() => government_projects.id).notNull(), // Optional foreign key referencing the project
  created_at: timestamp('created_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the media file was uploaded
});

// Feedback Reports Table: Stores reports of corruption or misconduct
export const feedback_reports = pgTable('feedback_reports', {
  id: serial('id').primaryKey(), // Unique identifier for each report
  title: varchar('title', { length: 255 }).notNull(), // Title of the report
  description: text('description').notNull(), // Detailed description of the issue
  evidence_url: varchar('evidence_url', { length: 255 }).notNull(), // URL for evidence (e.g., images, videos)
  reported_by: integer('reported_by').references(() => users.id), // User who reported the issue
  status: varchar('status', { length: 50 }).default('pending'), // Status of the report (e.g., pending, reviewed, resolved)
  created_at: timestamp('created_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the report was created
  updated_at: timestamp('updated_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the report was last updated
});

// Educational Content Table: Stores educational materials related to constitutional rights
export const educational_content = pgTable('educational_content', {
  id: serial('id').primaryKey(), // Unique identifier for each educational material
  title: varchar('title', { length: 255 }).notNull(), // Title of the content
  content: text('content').notNull(), // Detailed content
  content_type: varchar('content_type', { length: 50 }).notNull(), // Type of content (e.g., article, video, infographic)
  created_by: integer('created_by').references(() => users.id), // User or admin who created the content
  created_at: timestamp('created_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the content was created
  updated_at: timestamp('updated_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the content was last updated
});

// Posts Table: Stores posts made by users about leaders and projects
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(), // Unique identifier for each post
  title: varchar('title', { length: 255 }).notNull(), // Title of the post
  content: text('content').notNull(), // Content of the post
  user_id: integer('user_id').references(() => users.id), // User who made the post
  media_file_id: integer('media_file_id').references(() => media_files.id).notNull(), // Optional foreign key referencing media
  created_at: timestamp('created_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the post was created
  updated_at: timestamp('updated_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the post was last updated
});

// Comments Table: Stores comments on posts
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(), // Unique identifier for each comment
  post_id: integer('post_id').references(() => posts.id), // Foreign key referencing the post
  user_id: integer('user_id').references(() => users.id), // User who made the comment
  content: text('content').notNull(), // Content of the comment
  created_at: timestamp('created_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the comment was created
  updated_at: timestamp('updated_at').defaultNow().default(sql`NOW()`).notNull(), // Timestamp for when the comment was last updated
});
