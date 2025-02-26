<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transformar o recurso em um array.
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'genre'      => $this->genre,
            'author'     => $this->author,
            'image'      => $this->image ? asset('storage/' . $this->image) : null,
            'synopsis'   => $this->synopsis,
            'review'     => $this->review,
            'rating'     => $this->rating,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
