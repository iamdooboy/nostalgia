import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { Button } from "./ui/button"
import { Icons } from "./ui/icons"

export const ActionMenuDialog = ({
  onEdit,
  onDelete
}: {
  onEdit?: () => void
  onDelete?: () => void
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Icons.Pen className="size-5 mr-3" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <Icons.Trash className="size-5 mr-3" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
