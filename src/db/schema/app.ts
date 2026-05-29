import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const communityProfiles = pgTable("community_profiles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  username: text("username").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  linkedin: text("linkedin"),
  github: text("github"),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const blogs = pgTable("blogs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const communityProfilesRelations = relations(
  communityProfiles,
  ({ one }) => ({
    user: one(user, {
      fields: [communityProfiles.userId],
      references: [user.id],
    }),
  })
);

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(user, {
    fields: [blogs.userId],
    references: [user.id],
  }),
}));
