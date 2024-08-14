import React, { FunctionComponent, useState } from 'react'
import { NodeApi } from 'react-arborist'
import { Calendar } from '../../lib/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../lib/components/ui/popover'
import { TimePickerDemo } from '../../lib/components/ui/time-picker-demo'
import { cn } from '../../lib/utils'
import { TreeNode } from './utils'

type DateValueProps = {
    node: NodeApi<TreeNode<Date>>
}

export const DateValue: FunctionComponent<DateValueProps> = ({ node }) => {
    const [date, setDate] = useState<Date | undefined>(node.data.value)

    return (
        <Popover
            open={node.isEditing}
            onOpenChange={(open) => {
                if (!open) {
                    // @ts-expect-error we need more than string
                    node.submit(date)
                }
            }}
        >
            <PopoverTrigger asChild>
                <span
                    onClick={() => node.isEditable && node.edit()}
                    className={cn('text-ellipsis overflow-hidden whitespace-nowrap align-middle max-w-48 inline-block text-gray-400 text-xs', {
                        ['hover:bg-gray-100 transition-colors p-1 rounded-md cursor-pointer']: node.isEditable,
                    })}
                >
                    {node.data.value.toISOString()}
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
                <div className="p-3 border-t border-border">
                    <TimePickerDemo setDate={setDate} date={date} />
                </div>
            </PopoverContent>
        </Popover>
    )
}
