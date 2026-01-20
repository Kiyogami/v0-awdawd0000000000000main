import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, DollarSign, Package, TrendingUp, AlertCircle, Check } from 'lucide-react'

const stats = [
  {
    title: 'Zamowienia dzis',
    value: '12',
    change: '+15%',
    icon: ShoppingCart,
    trend: 'up'
  },
  {
    title: 'Przychod dzis',
    value: '3,450 zl',
    change: '+8%',
    icon: DollarSign,
    trend: 'up'
  },
  {
    title: 'Produkty',
    value: '24',
    change: '+2',
    icon: Package,
    trend: 'up'
  },
  {
    title: 'Weryfikacje',
    value: '3',
    change: 'Oczekujace',
    icon: AlertCircle,
    trend: 'warning'
  }
]

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Jan Kowalski',
    total: 299.99,
    status: 'pending',
    date: '10:30'
  },
  {
    id: 'ORD-002',
    customer: 'Anna Nowak',
    total: 749.97,
    status: 'shipped',
    date: '09:15'
  },
  {
    id: 'ORD-003',
    customer: 'Piotr Wisniewski',
    total: 449.99,
    status: 'delivered',
    date: '08:00'
  }
]

const statusLabels: Record<string, { label: string; className: string }> = {
  pending: { label: 'Oczekujace', className: 'status-pending' },
  processing: { label: 'W realizacji', className: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  shipped: { label: 'Wyslane', className: 'bg-primary/15 text-primary border-primary/30' },
  delivered: { label: 'Dostarczone', className: 'status-approved' }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Witaj w panelu administracyjnym</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="font-display text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.trend === 'up' ? 'text-green-400' : 
                    stat.trend === 'warning' ? 'text-yellow-400' : 'text-muted-foreground'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp className="w-3 h-3 inline mr-1" />}
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.trend === 'warning' ? 'bg-yellow-500/10' : 'bg-primary/10'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.trend === 'warning' ? 'text-yellow-400' : 'text-primary'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Ostatnie zamowienia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {order.status === 'delivered' ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Package className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{order.total.toFixed(2)} zl</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={statusLabels[order.status]?.className}>
                      {statusLabels[order.status]?.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{order.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
