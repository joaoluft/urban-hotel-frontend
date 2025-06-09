
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
      <div className="min-h-screen bg-gray-50 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pagamento</h1>
          </div>

          <Card className="shadow-lg border-0 w-full">
            <CardContent className="p-4 md:p-8">
              <div className="flex items-center space-x-4 mb-6">
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="p-2 text-gray-600 hover:text-gray-900 flex-shrink-0"
                >
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Dados do Cartão</h2>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                {/* Card Preview */}
                <div className="flex justify-center order-2 xl:order-1">
                  <div className="w-full max-w-sm" style={{ perspective: '1000px' }}>
                    <div 
                      className={`relative w-full aspect-[1.6/1] transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                    >
                      {/* Front of card */}
                      <div 
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 md:p-6 text-white shadow-xl backface-hidden"
                      >
                        <div className="flex justify-between items-start mb-6 md:mb-8">
                          <div className="w-8 h-6 md:w-12 md:h-8 bg-yellow-400 rounded"></div>
                          <CreditCard size={24} className="text-white/80 md:w-8 md:h-8" />
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <div className="text-base md:text-xl font-mono tracking-wider break-all">
                            {formData.card_number || '•••• •••• •••• ••••'}
                          </div>
                          <div className="flex justify-between text-sm md:text-base">
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
                      <div 
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white shadow-xl backface-hidden rotate-y-180"
                      >
                        <div className="w-full h-8 md:h-12 bg-black mt-4 md:mt-6"></div>
                        <div className="p-4 md:p-6">
                          <div className="flex justify-end">
                            <div className="w-12 h-6 md:w-16 md:h-8 bg-white rounded flex items-center justify-center">
                              <span className="text-black font-mono text-xs md:text-sm">
                                {formData.cvv || '•••'}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 md:mt-4 text-xs text-white/70">
                            CVV/CVC
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="order-1 xl:order-2">
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Cartão
                      </label>
                      <Input
                        value={formData.card_number}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        className="h-10 md:h-12 rounded-lg font-mono text-sm md:text-base"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Validade
                        </label>
                        <Input
                          value={formData.expiration}
                          onChange={handleExpirationChange}
                          placeholder="MM/AA"
                          className="h-10 md:h-12 rounded-lg font-mono text-sm md:text-base"
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
                          className="h-10 md:h-12 rounded-lg font-mono text-sm md:text-base"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4 md:pt-6 border-t">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl md:text-3xl font-bold text-gray-900">
                            R$ 200,00
                          </span>
                          <span className="text-base md:text-lg text-gray-500">Total</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => navigate(-1)}
                          className="w-full sm:w-auto px-6 md:px-8 h-10 md:h-12"
                        >
                          Voltar
                        </Button>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full sm:flex-1 px-6 md:px-8 h-10 md:h-12 bg-gray-800 hover:bg-gray-900"
                        >
                          {isLoading ? 'Processando...' : 'Finalizar Pagamento'}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
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
