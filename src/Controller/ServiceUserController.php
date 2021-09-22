<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\InputBag;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Firebase\JWT\JWT;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Library;
use App\Repository\LibraryRepository;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;

class ServiceUserController extends AbstractController {

    /**
     * @Route("/users/getAll", name="usersGetAll")
     */
    public function getAll(): Response
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        $response = $this->json($users);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/users/getMails", name="usersGetMails")
     */
    public function getMails(): Response
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
        $emails = array();
        foreach ($users as $user) {
            array_push($emails,$user->getEmail());
        }

        $response = $this->json($emails);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/users/getUsernames", name="usersGetUsernames")
     */
    public function getUserNames(): Response
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
        $usernames = array();
        foreach ($users as $user) {
            array_push($usernames,$user->getUsername());
        }

        $response = $this->json($usernames);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/users/checkLogin/{email}/{password}", name="checkLogin"): Response
     */
    public function checkLogin(Request $request,UserPasswordEncoderInterface $passwordEncoder,$email,$password){

        $data = json_decode($request->getContent(), true);

        $user = $this->getDoctrine()->getRepository(User::class)->findByEmail($email);
        if($user){
            $checkPass = $passwordEncoder->isPasswordValid($user, $password, null);
            if ($checkPass) {
                return new Response("true");
            }else{
                return new Response("false");
            }
        }else{
           return new Response("false");
        }
    }

    /**
     * @Route("/users/new",name="usersNew")
     */
    public function newUser(Request $request,UserPasswordEncoderInterface $encoder): Response
    {
        $user = new User();

        $data = json_decode($request->getContent(), true);

        $user->setUserName($data['username']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setEmail($data['email']);

        $plainPassword = $data['password'];
        $encoded = $encoder->encodePassword($user, $plainPassword);
        $user->setPassword($encoded);
        $user->setCountry($data['country']['name']);
        $user->setAge(number_format($data['age']['name']));

        $now = date_create();
        $current_date=strval(date_format($now, "Y-m-d"));
        $user->setMemberSince($current_date);

        $user->setRoles(array("ROLE_USER"));
        $user->setChatSecret($data['chatSecret']);

        $bytes = random_bytes(20);
        $user->setResetPassToken(strval(bin2hex($bytes)));
        
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/users/update", name="usersUpdate")
     */
    public function usersUpdate(Request $request,UserPasswordEncoderInterface $encoder): Response
    {
        $data = json_decode($request->getContent(), true);

        if ($data['password']) {
            $email = $data['email'];
            $user = $this->getDoctrine()->getRepository(User::class)->findByEmail($email);
            $plainPassword = $data['password'];
            $encoded = $encoder->encodePassword($user, $plainPassword);
            $user->setPassword($encoded);
        }
        else{
            $user=$this->getUser();
            if ($data['firstName']) {
                $user->setFirstName($data['firstName']);
            }
            if ($data['lastName']) {
                $user->setLastName($data['lastName']);
            }
            if ($data['email']) {
                $user->setEmail($data['email']);
            }
            if ($data['country']) {
                $user->setCountry($data['country']['name']);
            }
            if ($data['age']) {
                $user->setAge(number_format($data['age']['name']));
            }
        }
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return new Response(Response::HTTP_OK);

    }


    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    /**
     * @Route("/deleteProfile", name="deleteProfile")
     */
    public function deleteProfile(): Response
    {
        $user=$this->getUser();
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($user);
        $entityManager->flush();
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/isUserLogin", name="isUserLogin")
     */
    public function isUserLogin(): Response
    {
        if ($user=$this->getUser()) {
            return new Response("true");
        }
        return new Response("false");
    }

    /**
     * @Route("/users/getCurrentUser", name="getCurrentUser")
     */
    public function getCurrentUser(): Response {
        
        $user = $this->getUser();
        $response = $this->json($user);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/getPassToken/{email}", name="passToken")
     */
    public function getPassToken($email) {
        
        $user = $this->getDoctrine()->getRepository(User::class)->findByEmail($email);
        if($user){
            return new JsonResponse($user->getResetPassToken());
        }
        else {
            return new JsonResponse("false");
        }
    }

    /**
     * @Route("/getEmailByPassToken/{passToken}", name="EmailByPassToken")
     */
    public function getEmailByPassToken($passToken) {
        $user = $this->getDoctrine()->getRepository(User::class)->findUserByPassToken($passToken);
        if ($user) {
            return new JsonResponse($user->getEmail());
        }
        else {
            return new JsonResponse("false");
        }
    }

    /**
     * @Route("/getUserLibInfo", name="userLibInfo")
     */
    public function getUserLibInfo(){

        $user = $this->getUser();
        $allBooks = $this->getDoctrine()->getRepository(Library::class)->findBooksByUserId($user->getId());
        $allBooksNum=sizeof($allBooks);

        $forReadBooks = $this->getDoctrine()->getRepository(Library::class)->findForReadingBooksByUserId($user->getId(),true);
        $forReadBooksNum = sizeof($forReadBooks);

        $justReadBooks = $this->getDoctrine()->getRepository(Library::class)->findJustReadingBooksByUserId($user->getId(),true);
        $justReadBooksNum = sizeof($justReadBooks);

        $alreadyReadBooks = $this->getDoctrine()->getRepository(Library::class)->findAlreadyReadBooksByUserId($user->getId(),true);
        $alreadyReadBooksNum = sizeof($alreadyReadBooks);

        return new JsonResponse([$allBooksNum,$forReadBooksNum, $justReadBooksNum, $alreadyReadBooksNum]);
    }

    /**
     * @Route("/getUserByEmail/{email}",name="userByEmail")
     */
    public function getUserByEmail($email){

        $user = $this->getDoctrine()->getRepository(User::class)->findByEmail($email);
        return new JsonResponse([$user->getUsername(),$user->getChatSecret(),$user->getRoles()[0]]);
    }

    /**
     * @Route("/userPermission", name="userPermission")
     */
    public function userPermission()
    {
        $user=$this->getUser();
        if($user){
            $role = $user->getRoles()[0];
            if($role == "ROLE_ADMIN"){
                return new JsonResponse("admin");
            }
            elseif ($role == "ROLE_ORGANIZER") {
                return new JsonResponse("organizer");
            }else{
                return new JsonResponse("user");
            }
        }
        else{
            return new JsonResponse("false");
        }
    }

    /**
     * @Route("/users/uploadImg", name="uploadImg")
     */
    public function uploadImg(Request $request,SluggerInterface $slugger): Response
    {
        $file =$request->files->get('demo');
        $target_dir = $this->getParameter('img_directory');
        $filename = md5(uniqid()) . '.' . $file->guessExtension();

        $file->move($target_dir,$filename);
        
        $user=$this->getUser();
        $user->setPicture($filename);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }   
}