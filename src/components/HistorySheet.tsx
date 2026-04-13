import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { SavedReceipt } from '@/types/receipt';
import { formatCurrency } from '@/lib/receipt-utils';

interface Props {
  onLoad: (receipt: SavedReceipt) => void;
}

export function HistorySheet({ onLoad }: Props) {
  const history: SavedReceipt[] = JSON.parse(localStorage.getItem('receipt-history') || '[]');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-11 w-11">
          <History className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Receipt History</SheetTitle>
        </SheetHeader>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No receipts yet</p>
        ) : (
          <div className="space-y-2 mt-4">
            {history.map((r, i) => (
              <button
                key={i}
                className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors text-left min-h-[48px]"
                onClick={() => onLoad(r)}
              >
                <div>
                  <p className="font-mono text-sm font-semibold">{r.receiptNumber}</p>
                  <p className="text-sm text-muted-foreground">{r.clientName || 'No client'}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold text-sm">{formatCurrency(r.total)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
