<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    /**
     * Exibe a lista de livros.
     */
    public function index()
    {
        $books = Book::all();
        return BookResource::collection($books);
    }

    /**
     * Armazena um novo livro.
     */
    public function store(Request $request)
    {
        // Validação dos dados
        $validatedData = $request->validate([
            'title'    => 'required|string|max:255',
            'genre'    => 'required|string|max:100',
            'author'   => 'required|string|max:255',
            'image'    => 'nullable|image|max:2048',
            'synopsis' => 'required|string',
            'review'   => 'nullable|string',
            'rating'   => 'nullable|integer|min:1|max:5',
        ]);

        // Processar upload da imagem, se enviada
        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('books', 'public');
        }

        $book = Book::create($validatedData);

        return new BookResource($book);
    }

    /**
     * Exibe os detalhes de um livro.
     */
    public function show(Book $book)
    {
        return new BookResource($book);
    }

    /**
     * Atualiza os dados de um livro.
     */
    public function update(Request $request, Book $book)
    {
        $validatedData = $request->validate([
            'title'    => 'required|string|max:255',
            'genre'    => 'required|string|max:100',
            'author'   => 'required|string|max:255',
            'image'    => 'nullable|image|max:2048',
            'synopsis' => 'required|string',
            'review'   => 'nullable|string',
            'rating'   => 'nullable|integer|min:1|max:5',
        ]);

        // Se houver nova imagem, processa o upload e remove a antiga (se existir)
        if ($request->hasFile('image')) {
            if ($book->image) {
                Storage::disk('public')->delete($book->image);
            }
            $validatedData['image'] = $request->file('image')->store('books', 'public');
        }

        $book->update($validatedData);

        return new BookResource($book);
    }

    /**
     * Remove um livro.
     */
    public function destroy(Book $book)
    {
        if ($book->image) {
            Storage::disk('public')->delete($book->image);
        }
        $book->delete();

        return response()->json(['message' => 'Livro excluído com sucesso.']);
    }
}
