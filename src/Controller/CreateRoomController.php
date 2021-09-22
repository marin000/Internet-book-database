<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CreateRoomController extends AbstractController
{
    /**
     * @Route("/user/events/meetings/enterRoom", name="create_room")
     */
    public function index(): Response
    {
        return $this->render('create_room/index.html.twig', []);
    }
}
