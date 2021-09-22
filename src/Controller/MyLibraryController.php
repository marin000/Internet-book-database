<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyLibraryController extends AbstractController
{
    /**
     * @Route("/user/mylibrary", name="myLibrary")
     */
    public function index(): Response
    {
        return $this->render('my_library/index.html.twig', []);
    }
}
