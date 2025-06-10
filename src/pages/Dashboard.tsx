
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, Bed, HelpCircle, Gift, Headphones } from 'lucide-react';
import Layout from '@/components/Layout';

const Dashboard = () => {
  const menuItems = [
    {
      title: 'Verificar disponibilidade',
      description: 'Ver lista de quartos disponíveis',
      icon: Search,
      link: '/rooms',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Fazer reserva',
      description: 'Criar reserva para um quarto',
      icon: Calendar,
      link: '/rooms',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Minhas reservas',
      description: 'Ver reservas solicitadas',
      icon: Bed,
      link: '/my-bookings',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Promoções e Ofertas',
      description: 'Ver lista de ofertas e promoções em alta',
      icon: Gift,
      link: '/promotions',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Precisa de ajuda?',
      description: 'FAQ e Perguntas frequentes',
      icon: HelpCircle,
      link: '/help',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Suporte',
      description: 'Fale conosco por algum de nossos canais',
      icon: Headphones,
      link: '/support',
      color: 'bg-red-50 text-red-600'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu principal</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${item.color} ml-4`}>
                      <item.icon size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
