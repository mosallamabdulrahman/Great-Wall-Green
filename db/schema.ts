import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const inquiries = sqliteTable("inquiries", {
 id: text("id").primaryKey(), createdAt: text("created_at").notNull(),
 intent: text("intent").notNull(), product: text("product").notNull(),
 quantity: text("quantity").notNull(), packaging: text("packaging").notNull(),
 market: text("market").notNull(), message: text("message").notNull(),
 name: text("name").notNull(), company: text("company").notNull(),
 country: text("country").notNull(), email: text("email").notNull(),
 phone: text("phone").notNull(), language: text("language").notNull()
});
