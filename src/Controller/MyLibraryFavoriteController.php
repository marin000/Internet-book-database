<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyLibraryFavoriteController extends AbstractController
{
    /**
     * @Route("/user/mylibrary/favorite", name="my_library_favorite")
     */
    public function index(): Response
    {
        return $this->render('my_library_favorite/index.html.twig', [ ]);
    }
}
