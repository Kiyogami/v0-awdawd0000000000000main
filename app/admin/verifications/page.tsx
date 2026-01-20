import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Check, X, Clock, User } from 'lucide-react'

const verifications = [
  {
    id: 'VER-001',
    orderId: 'ORD-001',
    customer: 'Jan Kowalski',
    status: 'pending',
    submittedAt: null,
    product: 'BUCH Premium'
  },
  {
    id: 'VER-002',
    orderId: 'ORD-003',
    customer: 'Piotr Wisniewski',
    status: 'submitted',
    submittedAt: '2024-01-14 14:00',
    product: 'KOKO Gold Edition'
  },
  {
    id: 'VER-003',
    orderId: 'ORD-004',
    customer: 'Katarzyna Dabrowska',
    status: 'approved',
    submittedAt: '2024-01-15 11:00',
    product: 'BUCH Elite'
  }
]

const statusConfig: Record<string, { label: string; className: string; icon: typeof Clock }> = {
  pending: { label: 'Oczekuje na nagranie', className: 'status-pending', icon: Clock },
  submitted: { label: 'Do weryfikacji', className: 'bg-blue-500/15 text-blue-400 border-blue-500/30', icon: Shield },
  approved: { label: 'Zatwierdzona', className: 'status-approved', icon: Check },
  rejected: { label: 'Odrzucona', className: 'status-rejected', icon: X }
}

export default function AdminVerificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Weryfikacje</h1>
        <p className="text-muted-foreground mt-1">Zarzadzaj weryfikacjami tozsamosci klientow H2H</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Oczekujace</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Do weryfikacji</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Zatwierdzone</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verifications List */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Lista weryfikacji
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {verifications.map((verification) => {
            const config = statusConfig[verification.status]
            const StatusIcon = config.icon
            
            return (
              <div 
                key={verification.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{verification.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {verification.orderId} - {verification.product}
                    </p>
                    {verification.submittedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Przeslano: {verification.submittedAt}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={config.className}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {config.label}
                  </Badge>
                  {verification.status === 'submitted' && (
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/10 bg-transparent">
                        <X className="w-4 h-4 mr-1" />
                        Odrzuc
                      </Button>
                      <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                        <Check className="w-4 h-4 mr-1" />
                        Zatwierdz
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
