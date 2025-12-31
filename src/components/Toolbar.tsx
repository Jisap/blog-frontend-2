

import { cn } from '@/lib/utils'
import { useCurrentEditor } from '@tiptap/react'
import { useCallback } from 'react'
import { Separator } from './ui/separator'
import { Toggle } from './ui/toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from './ui/button'
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HeadingIcon,
  ItalicIcon,
  StrikethroughIcon,
  Undo2Icon,
  Redo2Icon,
  TextQuoteIcon,
  CodeSquareIcon,
  ChevronDownIcon,
  ListIcon,
  ListOrderedIcon
} from 'lucide-react';

import type { LucideProps } from 'lucide-react';

type Level = 1 | 2 | 3;

interface HeadingType {
  label: string;
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  level: Level;
}

const HEADINGS: HeadingType[] = [
  {
    label: "Heading 1",
    Icon: Heading1Icon,
    level: 1,
  },
  {
    label: "Heading 2",
    Icon: Heading2Icon,
    level: 2,
  },
  {
    label: "Heading 3",
    Icon: Heading3Icon,
    level: 3,
  },
];



export const Toolbar = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {

  const { editor } = useCurrentEditor();

  // Muestra el icono de encabezado correcto (H1, H2, H3) en la barra de herramientas, 
  // dependiendo de dónde esté el cursor del usuario en el editor de texto.
  const getActiveIcon = useCallback(() => {
    if (!editor) return <HeadingIcon />

    // Encontramos el nivel de encabezado activo. 
    // editor.isActive(...) es una función de Tiptap que devuelve true si el cursor del usuario está 
    // actualmente dentro de un nodo de tipo "heading" con el level especificado.
    // .find() se detiene y devuelve el primer objeto del array HEADINGS que cumpla la condición. 
    const activeHeading = HEADINGS.find(({ level }) => editor.isActive("heading", { level }));
    if (!activeHeading?.level) return <HeadingIcon />

    return <activeHeading.Icon />
  }, [editor]);

  if (!editor) return null;

  const isAnyHeadingActive = editor.isActive("heading"); // Comprueba si el cursor del usuario está dentro de un nodo de tipo "heading".

  return (
    <div
      className={cn(
        "flex items-center gap-1 p-2",
        className
      )}
      {...props}
    >
      {/* Undo */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.commands.undo()}
            disabled={!editor.can().undo()}
          >
            <Undo2Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom" className='text-center'>
          Undo
          <div className='opacity-70'>
            CTRL+Z
          </div>
        </TooltipContent>
      </Tooltip>

      {/* Redo */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.commands.redo()}
            disabled={!editor.can().redo()}
          >
            <Redo2Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom" className='text-center'>
          Redo
          <div className='opacity-70'>
            CTRL+Shift+Z
          </div>
        </TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className='data-[orientation=vertical]:h-4' />

      {/* DropdownMenu para seleccionar el nivel de encabezado */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                className='!px-2 gap-0'
                variant={isAnyHeadingActive ? "secondary" : "ghost"}
              >
                {getActiveIcon()}

                <ChevronDownIcon className='text-muted-foreground' />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <TooltipContent
            side="bottom"
          >
            Heading
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent
          align="start"
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className='text-muted-foreground'>
              Heading
            </DropdownMenuLabel>

            {HEADINGS.map(({ label, Icon, level }) => (
              <DropdownMenuItem
                key={`heding-${level}`}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                disabled={!editor.can().chain().focus().toggleHeading({ level }).run()}
              >
                <Icon />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Toggle lista */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            pressed={editor.isActive("bulletList")}
            className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
          >
            <ListIcon />
          </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          Bullet list
        </TooltipContent>
      </Tooltip>

      {/* Toggle ordered list */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle ordered list"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            pressed={editor.isActive("orderedList")}
            className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
          >
            <ListOrderedIcon />
          </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          Ordered list
        </TooltipContent>
      </Tooltip>

      {/* Toggle ordered list */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
            pressed={editor.isActive("blogquote")}
            className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
          >
            <TextQuoteIcon />
          </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom" className='text-center'>
          Blockquote
          <div className='opacity-70'>Ctrl+Shift+B</div>
        </TooltipContent>
      </Tooltip>

      {/* Toggle code block */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle code block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
            pressed={editor.isActive("codeblock")}
            className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
          >
            <CodeSquareIcon />
          </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom" className='text-center'>
          CodeBlock
          <div className='opacity-70'>Ctrl+Alt+C</div>
        </TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className='data-[orientation=vertical]:h-4' />

      {/* Toggle Bold */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            pressed={editor.isActive("bold")}
            className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
          >
            <BoldIcon />
          </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom" className='text-center'>
          Bold
          <div className='opacity-70'>Ctrl+B</div>
        </TooltipContent>
      </Tooltip>

      {/* Toggle Italic */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            pressed={editor.isActive("italic")}
            className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
          >
            <ItalicIcon />
          </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom" className='text-center'>
          Italic
          <div className='opacity-70'>Ctrl+I</div>
        </TooltipContent>
      </Tooltip>

      {/* Toggle strikethrough */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            pressed={editor.isActive("strike")}
            className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
          >
            <StrikethroughIcon />
          </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom" className='text-center'>
          Strike
          <div className='opacity-70'>Ctrl+Shift+S</div>
        </TooltipContent>
      </Tooltip>

      {/* Toggle code */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Toggle code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            pressed={editor.isActive("code")}
            className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
          >
            <CodeIcon />
          </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom" className='text-center'>
          Code
          <div className='opacity-70'>Ctrl+E</div>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
