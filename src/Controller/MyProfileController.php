<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyProfileController extends AbstractController
{
    /**
     * @Route("/user/myprofile", name="my_profile")
     */
    public function index(): Response
    {
        return $this->render('my_profile/index.html.twig', []);
    }
}
