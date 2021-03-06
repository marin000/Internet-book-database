<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ForgotPasswordController extends AbstractController
{
    /**
     * @Route("/forgot", name="forgot_password")
     */
    public function index(): Response
    {
        return $this->render('forgot_password/index.html.twig', []);
    }
}
