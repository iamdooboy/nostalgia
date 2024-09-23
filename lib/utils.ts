import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "Something went wrong"
) => {
  console.error(error)
  let errorMessage = defaultMessage
  if (error instanceof Error && error.message.length < 100) {
    errorMessage = error.message
  }
  return errorMessage
}

export function getTimeDifference(date: Date): string {
  const currentDate = new Date()

  // Calculate the difference in milliseconds
  const differenceInMs = currentDate.getTime() - date.getTime()

  // Convert differences into minutes, hours, and days
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60))
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60))
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24))

  // Get the number of days in the current month
  const currentMonth = currentDate.getMonth()
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentMonth + 1,
    0
  ).getDate()

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m`
  } else if (differenceInHours < 24) {
    return `${differenceInHours}h`
  } else if (differenceInDays < daysInMonth) {
    return `${differenceInDays}d`
  } else {
    return `More than a month ago`
  }
}
