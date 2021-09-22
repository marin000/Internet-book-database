<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Trivia;
use App\Repository\TriviaRepository;

class ServiceAdminController extends AbstractController {

    /**
     * @Route("/deleteUser/{id}", name="deleteUser")
     */
    public function deleteUser($id): Response
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($user);
        $entityManager->flush();
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/updateUserRole/{id}/{role}", name="updateUserRole")
     */
    public function updateUserRole($id,$role): Response
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);
        if($role=="Admin"){
            $user->setRoles(array("ROLE_ADMIN"));
        }
        elseif ($role=="User") {
            $user->setRoles(array("ROLE_USER"));
        }
        elseif ($role=="Organizer") {
            $user->setRoles(array("ROLE_ORGANIZER"));
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/trivia/createNew", name="treviaNew")
     */
    public function createNewTrivia(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $trivia = new Trivia();
        $trivia->setName($data['name']);
        $trivia->setPublished(false);

        $questions = array();
        array_push($questions,$data['question1'],$data['question2'],$data['question3'],$data['question4'],$data['question5'],$data['question6'],$data['question7']);
        $trivia->setQuestions($questions);

        $answer1 = array();
        array_push($answer1,$data['correct1'],$data['option1a'],$data['option1b'],$data['option1c']);
        $trivia->setAnswer1($answer1);

        $answer2 = array();
        array_push($answer2,$data['correct2'],$data['option2a'],$data['option2b'],$data['option2c']);
        $trivia->setAnswer2($answer2);

        $answer3 = array();
        array_push($answer3,$data['correct3'],$data['option3a'],$data['option3b'],$data['option3c']);
        $trivia->setAnswer3($answer3);

        $answer4 = array();
        array_push($answer4,$data['correct4'],$data['option4a'],$data['option4b'],$data['option4c']);
        $trivia->setAnswer4($answer4);

        $trivia->setAnswer5($data['correct5']);
        $trivia->setAnswer6($data['correct6']);
        $trivia->setAnswer7($data['correct7']);
        
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($trivia);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/trivia/getAll", name="treviaGetAll")
     */
    public function triviaGetAll(): Response
    {
        $trivia = $this->getDoctrine()->getRepository(Trivia::class)->findAll();

        $response = $this->json($trivia);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/deleteTrivia/{id}", name="deleteTrivia")
     */
    public function deleteTrivia($id): Response
    {
        $trivia = $this->getDoctrine()->getRepository(Trivia::class)->find($id);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($trivia);
        $entityManager->flush();
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/publishTrivia/{id}", name="publishTrivia")
     */
    public function publishTrivia($id): Response
    {
        $trivia = $this->getDoctrine()->getRepository(Trivia::class)->find($id);

        if($trivia->getPublished()){
            $trivia->setPublished(false);
        }
        else{
            $trivia->setPublished(true);
            $now = date_create();
            $current_date=strval(date_format($now, "Y-m-d"));
            $trivia->setDateOfCreation($current_date);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/getTrivia/{id}", name="getTrivia")
     */
    public function getTrivia($id): Response
    {
        $trivia = $this->getDoctrine()->getRepository(Trivia::class)->find($id);
        $response = $this->json($trivia);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/editTrivia/{id}", name="editTrivia")
     */
    public function editTrivia($id,Request $request): Response
    {
        $trivia = $this->getDoctrine()->getRepository(Trivia::class)->find($id);
        $data = json_decode($request->getContent(), true);

        if($data['name']){$trivia->setName($data['name']);}

        if($data['question1']){
            $base = $trivia->getQuestions();
            $replacements = array(0 => $data['question1']);
            $trivia->setQuestions(array_replace($base, $replacements));
        }
        if($data['question2']){
            $base = $trivia->getQuestions();
            $replacements = array(1 => $data['question2']);
            $trivia->setQuestions(array_replace($base, $replacements));
        }
        if($data['question3']){
            $base = $trivia->getQuestions();
            $replacements = array(2 => $data['question3']);
            $trivia->setQuestions(array_replace($base, $replacements));
        }
        if($data['question4']){
            $base = $trivia->getQuestions();
            $replacements = array(3 => $data['question4']);
            $trivia->setQuestions(array_replace($base, $replacements));
        }
        if($data['question5']){
            $base = $trivia->getQuestions();
            $replacements = array(4 => $data['question5']);
            $trivia->setQuestions(array_replace($base, $replacements));
        }
        if($data['question6']){
            $base = $trivia->getQuestions();
            $replacements = array(5 => $data['question6']);
            $trivia->setQuestions(array_replace($base, $replacements));
        }
        if($data['question7']){
            $base = $trivia->getQuestions();
            $replacements = array(6 => $data['question7']);
            $trivia->setQuestions(array_replace($base, $replacements));
        }

        if($data['correct1']){
            $base = $trivia->getAnswer1();
            $replacements = array(0 => $data['correct1']);
            $trivia->setAnswer1(array_replace($base,$replacements));
        }
        if($data['option1a']){
            $base = $trivia->getAnswer1();
            $replacements = array(1 => $data['option1a']);
            $trivia->setAnswer1(array_replace($base,$replacements));
        }
        if($data['option1b']){
            $base = $trivia->getAnswer1();
            $replacements = array(2 => $data['option1b']);
            $trivia->setAnswer1(array_replace($base,$replacements));
        }
        if($data['option1c']){
            $base = $trivia->getAnswer1();
            $replacements = array(3 => $data['option1c']);
            $trivia->setAnswer1(array_replace($base,$replacements));
        }

        if($data['correct2']){
            $base = $trivia->getAnswer2();
            $replacements = array(0 => $data['correct2']);
            $trivia->setAnswer2(array_replace($base,$replacements));
        }
        if($data['option2a']){
            $base = $trivia->getAnswer2();
            $replacements = array(1 => $data['option2a']);
            $trivia->setAnswer2(array_replace($base,$replacements));
        }
        if($data['option2b']){
            $base = $trivia->getAnswer2();
            $replacements = array(2 => $data['option2b']);
            $trivia->setAnswer2(array_replace($base,$replacements));
        }
        if($data['option2c']){
            $base = $trivia->getAnswer2();
            $replacements = array(3 => $data['option2c']);
            $trivia->setAnswer2(array_replace($base,$replacements));
        }

        if($data['correct3']){
            $base = $trivia->getAnswer3();
            $replacements = array(0 => $data['correct3']);
            $trivia->setAnswer3(array_replace($base,$replacements));
        }
        if($data['option3a']){
            $base = $trivia->getAnswer3();
            $replacements = array(1 => $data['option3a']);
            $trivia->setAnswer3(array_replace($base,$replacements));
        }
        if($data['option3b']){
            $base = $trivia->getAnswer3();
            $replacements = array(2 => $data['option3b']);
            $trivia->setAnswer3(array_replace($base,$replacements));
        }
        if($data['option3c']){
            $base = $trivia->getAnswer3();
            $replacements = array(3 => $data['option3c']);
            $trivia->setAnswer3(array_replace($base,$replacements));
        }

        if($data['correct4']){
            $base = $trivia->getAnswer4();
            $replacements = array(0 => $data['correct4']);
            $trivia->setAnswer4(array_replace($base,$replacements));
        }
        if($data['option4a']){
            $base = $trivia->getAnswer4();
            $replacements = array(1 => $data['option4a']);
            $trivia->setAnswer4(array_replace($base,$replacements));
        }
        if($data['option4b']){
            $base = $trivia->getAnswer4();
            $replacements = array(2 => $data['option4b']);
            $trivia->setAnswer4(array_replace($base,$replacements));
        }
        if($data['option4c']){
            $base = $trivia->getAnswer4();
            $replacements = array(3 => $data['option4c']);
            $trivia->setAnswer4(array_replace($base,$replacements));
        }

        if($data['correct5']){$trivia->setAnswer5($data['correct5']);}
        if($data['correct6']){$trivia->setAnswer6($data['correct6']);}
        if($data['correct7']){$trivia->setAnswer7($data['correct7']);}


        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return new Response(Response::HTTP_OK);

    }
}


