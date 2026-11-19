export class DashboardActionError extends Error {}

export function getDashboardActionError(
  error: unknown,
  fallback: string
): string {
  if (error instanceof DashboardActionError) {
    return error.message;
  }

  if (error instanceof Error && error.name === "ValidationError") {
    return error.message;
  }

  if (error instanceof Error && error.name === "CastError") {
    return "The selected record is invalid. Refresh the page and try again.";
  }

  if (
    error instanceof Error &&
    /MongoDB connection string|Could not connect to MongoDB|MongooseServerSelectionError/i.test(
      error.message
    )
  ) {
    return "The database is unavailable. Check the MONGO_URI or MONGODB_URI configuration.";
  }

  return fallback;
}
