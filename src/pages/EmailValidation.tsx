
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { validateEmailCode } from '@/services/api/emailValidation';

const EmailValidation = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      setError('Código não fornecido na URL');
      setLoading(false);
      return;
    }

    const validateCode = async () => {
      try {
        setLoading(true);
        const response = await validateEmailCode(code);
        
        if (response.success) {
          setSuccess(true);
          setError(null);
        } else {
          setError(response.message || 'Código inválido');
          setSuccess(false);
        }
      } catch (error: any) {
        setError(error.message || 'Código expirado ou inválido');
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    validateCode();
  }, [code]);

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">
            Validação de Email
          </h2>
          <p className="mt-2 text-gray-600">
            Verificando seu código de validação
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            {loading && (
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-500" />
                <p className="text-gray-600">Validando código...</p>
              </div>
            )}

            {!loading && success && (
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    Email validado com sucesso! Sua conta foi ativada.
                  </AlertDescription>
                </Alert>
                <Button 
                  onClick={handleRedirectToLogin}
                  className="w-full bg-gray-800 hover:bg-gray-900"
                >
                  Fazer Login
                </Button>
              </div>
            )}

            {!loading && !success && error && (
              <div className="text-center space-y-4">
                <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                <Alert variant="destructive">
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Button 
                    onClick={handleRedirectToLogin}
                    className="w-full bg-gray-800 hover:bg-gray-900"
                  >
                    Voltar ao Login
                  </Button>
                  <p className="text-sm text-gray-600">
                    Precisa de ajuda?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-500">
                      Cadastre-se novamente
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailValidation;
