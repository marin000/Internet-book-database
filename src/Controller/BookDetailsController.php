<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BookDetailsController extends AbstractController
{
    /**
     * @Route("/book/details/{bookId}/{author}", name="book_details")
     */
    public function index(): Response
    {
        return $this->render('book_details/index.html.twig', []);
    }
}
