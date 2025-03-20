import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface InputFieldProps {
    label: string;
    placeholder?: string;
    form: any;
    name: string;
    disabled?: boolean;
    readonly?: boolean;
    type?: string;
}

interface ITextAreaField extends InputFieldProps {

}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, form, name, disabled, readonly, type }: InputFieldProps) => {
    return (<FormField
        control={form}
        name={name}
        render={({ field }) => (
            <FormItem className="space-y-2 w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input type={type || 'text'} className="read-only:opacity-75" readOnly={readonly || false} placeholder={placeholder} disabled={disabled} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />)
}

const TextAreaField: React.FC<ITextAreaField> = ({ form, name, label, placeholder, disabled }: ITextAreaField) => {
    return (<FormField
        control={form}
        name={name}
        render={({ field }) => (
            <FormItem className="space-y-2 w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Textarea disabled={disabled} {...field} placeholder={placeholder} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />)
}


interface SelectFieldProps extends InputFieldProps {
    options?: any;
    defaultValue?: any;
    width?: string;
    list?: any;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, form, name, disabled, options, placeholder, defaultValue, width, list }: SelectFieldProps) => {




    return (<FormField
        control={form}
        name={name}
        render={({ field }) => (
            <FormItem className={`${width ? width : "w-full"} space-y-2`}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Select
                        disabled={disabled}
                        onValueChange={field.onChange}
                        // defaultValue={defaultValue}
                        {...field}
                    >
                        <SelectTrigger >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options && options.map((item: any, i: number) => (
                                <SelectItem key={i} value={item.value}>
                                    {item.title}
                                </SelectItem>
                            ))}
                            {
                                list && list.map((item: any, i: number) => (
                                    <SelectItem key={i} value={item}>
                                        {item}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />)
}

interface SwitchFieldProps {
    title: string
    description?: string;
    form: any;
    name: string;

}

const SwitchField: React.FC<SwitchFieldProps> = ({ form, title, description, name }: SwitchFieldProps) => {
    return (<FormField
        control={form}
        name={name}
        render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <FormLabel>
                        {title}
                    </FormLabel>
                    <FormDescription>
                        {description}
                    </FormDescription>
                </div>
                <FormControl>
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                </FormControl>
            </FormItem>
        )}
    />);
}

export { InputField, SelectField, SwitchField, TextAreaField };