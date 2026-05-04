
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeHightLight from "./code-highlight";

type Props = {
  code: string[];
};

const CodeCard = ({code}: Props) => {
  return (
    <Tabs defaultValue="html" className="w-[800px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="html">HTML or React </TabsTrigger>
        <TabsTrigger value="react">Next.js (ts)</TabsTrigger>
      </TabsList>
      <TabsContent value="html">
        <Card>
          <CardHeader>
            <p className='text-xl ' > Add the below code in script tag at the end of body of  index.html</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <CodeHightLight code={code[0]} lang="javascript" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="react">
        <Card>
          <CardHeader>
           <p className='text-xl ' > create a  new component ChatbotIframe</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <CodeHightLight code={code[1]} lang="tsx" />    
             <p className='text-xl ' > Layout.tsx</p>  
             <CodeHightLight code={code[2]} lang="tsx" />   
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CodeCard;
