import { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Upload, X } from 'lucide-react';
import { BusinessInfo } from '@/types/receipt';

interface Props {
  businessInfo: BusinessInfo;
  onSave: (info: BusinessInfo) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SettingsSheet({ businessInfo, onSave, open, onOpenChange }: Props) {
  const [form, setForm] = useState<BusinessInfo>(businessInfo);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, logo: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(form);
    onOpenChange?.(false);
  };

  return (
    <Sheet open={open} onOpenChange={(o) => { if (o) setForm(businessInfo); onOpenChange?.(o); }}>
      {!open && (
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-11 w-11">
            <Settings className="h-5 w-5" />
          </Button>
        </SheetTrigger>
      )}
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Business Info</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Business Name *</Label>
            <Input value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} placeholder="Your Business Name" className="h-11 mt-1" />
          </div>
          <div>
            <Label>Phone *</Label>
            <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 123-4567" className="h-11 mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" className="h-11 mt-1" />
          </div>
          <div>
            <Label>Address</Label>
            <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="123 Main St" className="h-11 mt-1" />
          </div>
          <div>
            <Label>Logo</Label>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            <div className="flex items-center gap-3 mt-1">
              {form.logo ? (
                <div className="relative">
                  <img src={form.logo} alt="Logo" className="h-16 w-16 object-contain rounded-lg border" />
                  <button onClick={() => setForm(f => ({ ...f, logo: '' }))} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <Button variant="outline" className="h-11" onClick={() => fileRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Logo
                </Button>
              )}
            </div>
          </div>
          <Button className="w-full h-12 text-base" onClick={handleSave}>Save Business Info</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
