<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MeetingsNewErrorController extends AbstractController
{
    /**
     * @Route("/user/events/meetings/new/error", name="meetings_new_error")
     */
    public function index(): Response
    {
        return $this->render('meetings_new_error/index.html.twig', []);
    }
}
