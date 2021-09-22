<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MeetingsController extends AbstractController
{
    /**
     * @Route("/user/events/meetings", name="meetings")
     */
    public function index(): Response
    {
        return $this->render('meetings/index.html.twig', []);
    }
}
