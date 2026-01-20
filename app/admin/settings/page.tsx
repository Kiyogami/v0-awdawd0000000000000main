import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Settings, Store, Bell, Shield, CreditCard } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Ustawienia</h1>
        <p className="text-muted-foreground mt-1">Zarzadzaj konfiguracją sklepu</p>
      </div>

      <div className="grid gap-6">
        {/* Store Settings */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Store className="w-5 h-5 text-primary" />
              Ustawienia sklepu
            </CardTitle>
            <CardDescription>Podstawowe informacje o sklepie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storeName">Nazwa sklepu</Label>
                <Input id="storeName" defaultValue="Prascy Bandyci" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="storeEmail">Email kontaktowy</Label>
                <Input id="storeEmail" type="email" defaultValue="kontakt@prascy.pl" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="telegramHandle">Telegram</Label>
              <Input id="telegramHandle" defaultValue="@PrascyBandyci" className="mt-1.5" />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Zapisz zmiany
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Powiadomienia
            </CardTitle>
            <CardDescription>Zarzadzaj powiadomieniami</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Nowe zamowienia</p>
                <p className="text-sm text-muted-foreground">Otrzymuj powiadomienia o nowych zamowieniach</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weryfikacje</p>
                <p className="text-sm text-muted-foreground">Powiadomienia o nowych weryfikacjach H2H</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email podsumowania</p>
                <p className="text-sm text-muted-foreground">Dzienny raport sprzedazy na email</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Bezpieczenstwo
            </CardTitle>
            <CardDescription>Ustawienia bezpieczenstwa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weryfikacja H2H wymagana</p>
                <p className="text-sm text-muted-foreground">Wymagaj weryfikacji dla odbioru osobistego</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div>
              <Label htmlFor="adminSecret">Klucz administratora</Label>
              <Input id="adminSecret" type="password" defaultValue="********" className="mt-1.5" />
              <p className="text-xs text-muted-foreground mt-1">
                Uzywany do autoryzacji API
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payments */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Platnosci
            </CardTitle>
            <CardDescription>Konfiguracja metod platnosci</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Stripe</p>
                <p className="text-sm text-muted-foreground">Karty platnicze</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Przelewy24</p>
                <p className="text-sm text-muted-foreground">Szybkie przelewy</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">BLIK</p>
                <p className="text-sm text-muted-foreground">Platnosci BLIK</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
