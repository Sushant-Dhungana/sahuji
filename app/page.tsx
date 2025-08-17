import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col w-[200px] gap-y-4 mt-20">
      <Button variant="elevated">I am a button</Button>
      <Input placeholder="I am an input" />
      <Progress value={50} className="w-full" />
      <Textarea placeholder="I am a textarea" />
      <Checkbox />
    </div>
  );
}
