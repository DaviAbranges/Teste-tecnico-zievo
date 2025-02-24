<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Certifique-se de importar corretamente

class AuthenticatedSessionController extends Controller
{
    public function store(Request $request)
    {
        // Validação dos dados de login
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Tenta autenticar o usuário com as credenciais fornecidas
        if (!Auth::attempt($request->only('email', 'password'))) {
            return back()->withErrors([
                'email' => 'As credenciais fornecidas não coincidem com nossos registros.',
            ]);
        }

        // Gera um token para o usuário autenticado
        $token = $request->user()->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Logado com sucesso',
            'token' => $token,
            'token_type' => 'Bearer'
        ], 200);
    }

    public function destroy(Request $request)
    {
        // Desloga o usuário
        Auth::logout();

        // Invalida e regenera o token da sessão
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout realizado com sucesso'
        ], 200);
    }
}
