<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyLibraryForReadingController extends AbstractController
{
    /**
     * @Route("user/mylibrary/forReading", name="my_library_for_reading")
     */
    public function index(): Response
    {
        return $this->render('my_library_for_reading/index.html.twig', []);
    }
}
