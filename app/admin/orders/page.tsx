"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Filter, Eye, Package } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Loading from './loading'

const orders = [
  {
    id: 'ORD-001',
    customer: 'Jan Kowalski',
    email: 'jan@example.com',
    items: 1,
    total: 299.99,
    status: 'pending',
    delivery: 'h2h',
    date: '2024-01-15 10:30'
  },
  {
    id: 'ORD-002',
    customer: 'Anna Nowak',
    email: 'anna@example.com',
    items: 3,
    total: 749.97,
    status: 'shipped',
    delivery: 'inpost',
    date: '2024-01-14 15:45'
  },
  {
    id: 'ORD-003',
    customer: 'Piotr Wisniewski',
    email: 'piotr@example.com',
    items: 1,
    total: 449.99,
    status: 'delivered',
    delivery: 'h2h',
    date: '2024-01-13 12:00'
  },
  {
    id: 'ORD-004',
    customer: 'Katarzyna Dabrowska',
    email: 'kasia@example.com',
    items: 1,
    total: 599.99,
    status: 'processing',
    delivery: 'h2h',
    date: '2024-01-15 08:00'
  },
  {
    id: 'ORD-005',
    customer: 'Michal Lewandowski',
    email: 'michal@example.com',
    items: 3,
    total: 449.97,
    status: 'shipped',
    delivery: 'inpost',
    date: '2024-01-12 18:00'
  }
]

const statusLabels: Record<string, { label: string; className: string }> = {
  pending: { label: 'Oczekujace', className: 'status-pending' },
  processing: { label: 'W realizacji', className: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  shipped: { label: 'Wyslane', className: 'bg-primary/15 text-primary border-primary/30' },
  delivered: { label: 'Dostarczone', className: 'status-approved' }
}

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const searchParams = useSearchParams()

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Zamowienia</h1>
          <p className="text-muted-foreground mt-1">Zarzadzaj zamowieniami klientow</p>
        </div>

        {/* Filters */}
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Szukaj zamowien..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="pending">Oczekujace</SelectItem>
                  <SelectItem value="processing">W realizacji</SelectItem>
                  <SelectItem value="shipped">Wyslane</SelectItem>
                  <SelectItem value="delivered">Dostarczone</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Lista zamowien ({filteredOrders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nr zamowienia</TableHead>
                  <TableHead>Klient</TableHead>
                  <TableHead>Produkty</TableHead>
                  <TableHead>Kwota</TableHead>
                  <TableHead>Dostawa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="font-semibold text-primary">
                      {order.total.toFixed(2)} zl
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {order.delivery === 'h2h' ? 'H2H' : 'InPost'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusLabels[order.status]?.className}>
                        {statusLabels[order.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  )
}
