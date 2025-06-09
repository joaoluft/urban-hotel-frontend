
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, User, FileText } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { register } from '@/services/api/register';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (password !== confirmPassword) {
        toast.error('As senhas não coincidem');
        return;
      }

      if (password.length < 6) {
        toast.error('A senha deve ter pelo menos 6 caracteres');
        return;
      }

      const registered = await register({
        username: name,
        email,
        cpf: document,
        password,
        confirm_password: confirmPassword,
      })

      if (!registered.success) throw new Error;
    
      toast.success('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao realizar cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-sm relative">
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">URBAN</h1>
                <p className="text-2xl font-bold text-gray-900">HOTEL</p>
              </div>
            </div>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
              <CardTitle className="text-2xl font-semibold">Cadastro</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Nome de usuário"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-4 pr-10 h-12 rounded-lg border-gray-300"
                    required
                  />
                  <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-4 pr-10 h-12 rounded-lg border-gray-300"
                    required
                  />
                  <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="CPF"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    className="pl-4 pr-10 h-12 rounded-lg border-gray-300"
                    required
                  />
                  <FileText className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-4 pr-10 h-12 rounded-lg border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-4 pr-10 h-12 rounded-lg border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex space-x-3 pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-lg"
                  >
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                  <Link to="/login" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 border-gray-300 text-gray-700 rounded-lg"
                    >
                      Entrar
                    </Button>
                  </Link>
                </div>

                <div className="text-center pt-2">
                  <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700">
                    Já tem uma conta? Faça login aqui!
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
