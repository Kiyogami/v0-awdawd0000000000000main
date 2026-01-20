import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Package, Plus, Edit, Trash2, Star, Shield } from 'lucide-react'
import { products } from '@/lib/data'

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Produkty</h1>
          <p className="text-muted-foreground mt-1">Zarzadzaj katalogiem produktow</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Dodaj produkt
        </Button>
      </div>

      {/* Products Table */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Lista produktow ({products.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produkt</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Cena</TableHead>
                <TableHead>Warianty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={product.image || "/placeholder.svg"} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          {product.name}
                          {product.featured && <Star className="w-3 h-3 text-primary" />}
                        </p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">
                    {product.price.toFixed(2)} zl
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.variants.slice(0, 3).map((v) => (
                        <Badge key={v} variant="secondary" className="text-xs">
                          {v}
                        </Badge>
                      ))}
                      {product.variants.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{product.variants.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {product.requiresVerification && (
                        <Badge variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          H2H
                        </Badge>
                      )}
                      <Badge className="status-approved text-xs">
                        Aktywny
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
