import { ReceiptPreview } from './ReceiptPreview';
import { ReceiptData } from '@/types/receipt';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Props {
  data: ReceiptData;
}

export function ReadOnlyReceipt({ data }: Props) {
  return (
    <div className="min-h-screen bg-muted/50 p-4">
      <div className="max-w-md mx-auto">
        <Button variant="ghost" className="mb-4 h-11" onClick={() => { window.location.hash = '/'; }}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <ReceiptPreview data={data} />
      </div>
    </div>
  );
}
