<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyLibraryJustReadingController extends AbstractController
{
    /**
     * @Route("/user/mylibrary/justReading", name="my_library_just_reading")
     */
    public function index(): Response
    {
        return $this->render('my_library_just_reading/index.html.twig', []);
    }
}
