<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $FirstName;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $LastName;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $Email;

    /**
     * @var string The hashed password
     * @ORM\Column(type="string", length=255)
     */
    private $Password;

    /**
     * @ORM\Column(type="array")
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $Country;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $MemberSince;


    /**
     * @ORM\Column(type="integer")
     */
    private $Age;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $ResetPassToken;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $Picture;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     */
    private $UserName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $ChatSecret;

    public function __construct()
    {
        $this->libraries = new ArrayCollection();
    }

    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->FirstName;
    }

    public function setFirstName(string $FirstName): self
    {
        $this->FirstName = $FirstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->LastName;
    }

    public function setLastName(string $LastName): self
    {
        $this->LastName = $LastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->Email;
    }

    public function setEmail(string $Email): self
    {
        $this->Email = $Email;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): ?string
    {
        return $this->Password;
    }

    public function setPassword(string $Password): self
    {
        $this->Password = $Password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->UserName;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getCountry(): ?string
    {
        return $this->Country;
    }

    public function setCountry(string $Country): self
    {
        $this->Country = $Country;

        return $this;
    }

    public function getMemberSince(): ?string
    {
        return $this->MemberSince;
    }

    public function setMemberSince(string $MemberSince): self
    {
        $this->MemberSince = $MemberSince;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->Age;
    }

    public function setAge(int $Age): self
    {
        $this->Age = $Age;

        return $this;
    }

    public function getResetPassToken(): ?string
    {
        return $this->ResetPassToken;
    }

    public function setResetPassToken(string $ResetPassToken): self
    {
        $this->ResetPassToken = $ResetPassToken;

        return $this;
    }

    public function getPicture()
    {
        return $this->Picture;
    }

    public function setPicture($Picture)
    {
        $this->Picture = $Picture;

        return $this;
    }

    public function setUserName(string $UserName): self
    {
        $this->UserName = $UserName;

        return $this;
    }

    public function getChatSecret(): ?string
    {
        return $this->ChatSecret;
    }

    public function setChatSecret(string $ChatSecret): self
    {
        $this->ChatSecret = $ChatSecret;

        return $this;
    }
   
}
