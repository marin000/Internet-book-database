<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyLibraryAlreadyReadController extends AbstractController
{
    /**
     * @Route("/user/mylibrary/alreadyRead", name="my_library_already_read")
     */
    public function index(): Response
    {
        return $this->render('my_library_already_read/index.html.twig', [ ]);
    }
}
