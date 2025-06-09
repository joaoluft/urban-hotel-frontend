
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    currency: 'BRL',
    card_number: '',
    expiration: '',
    cvv: ''
  });
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiration = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setFormData({ ...formData, card_number: formatted });
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiration(e.target.value);
    if (formatted.length <= 5) {
      setFormData({ ...formData, expiration: formatted });
    }
  };

  const handleCvvFocus = () => {
    setIsFlipped(true);
  };

  const handleCvvBlur = () => {
    setIsFlipped(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.card_number || !formData.expiration || !formData.cvv) {
      toast.error('Preencha todos os campos do cartão');
      return;
    }

    setIsLoading(true);
    
    // Simulação de processamento de pagamento
    setTimeout(() => {
      toast.success('Pagamento processado com sucesso!');
      navigate('/my-reservations');
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">Pagamento</h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
              </Button>
              <h2 className="text-2xl font-bold text-gray-900">Dados do Cartão</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card Preview */}
              <div className="flex justify-center">
                <div className="perspective-1000">
                  <div className={`relative w-80 h-48 transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front of card */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-12 h-8 bg-yellow-400 rounded"></div>
                        <CreditCard size={32} className="text-white/80" />
                      </div>
                      <div className="space-y-4">
                        <div className="text-xl font-mono tracking-wider">
                          {formData.card_number || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <div className="text-xs text-white/70">VALIDADE</div>
                            <div className="font-mono">{formData.expiration || 'MM/AA'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-white/70">MOEDA</div>
                            <div className="font-mono">{formData.currency}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white shadow-xl">
                      <div className="w-full h-12 bg-black mt-6"></div>
                      <div className="p-6">
                        <div className="flex justify-end">
                          <div className="w-16 h-8 bg-white rounded flex items-center justify-center">
                            <span className="text-black font-mono text-sm">
                              {formData.cvv || '•••'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 text-xs text-white/70">
                          CVV/CVC
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do Cartão
                  </label>
                  <Input
                    value={formData.card_number}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="h-12 rounded-lg font-mono"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validade
                    </label>
                    <Input
                      value={formData.expiration}
                      onChange={handleExpirationChange}
                      placeholder="MM/AA"
                      className="h-12 rounded-lg font-mono"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <Input
                      value={formData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 3) {
                          setFormData({ ...formData, cvv: value });
                        }
                      }}
                      onFocus={handleCvvFocus}
                      onBlur={handleCvvBlur}
                      placeholder="123"
                      className="h-12 rounded-lg font-mono"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      R$ 200,00
                    </span>
                    <span className="text-lg text-gray-500">Total</span>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(-1)}
                      className="px-8"
                    >
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 bg-gray-800 hover:bg-gray-900"
                    >
                      {isLoading ? 'Processando...' : 'Finalizar Pagamento'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </Layout>
  );
};

export default Payment;
