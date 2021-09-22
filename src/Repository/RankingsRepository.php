<?php

namespace App\Repository;

use App\Entity\Rankings;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Rankings|null find($id, $lockMode = null, $lockVersion = null)
 * @method Rankings|null findOneBy(array $criteria, array $orderBy = null)
 * @method Rankings[]    findAll()
 * @method Rankings[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RankingsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Rankings::class);
    }

    // /**
    //  * @return Rankings[] Returns an array of Rankings objects
    //  */
    
    public function findByTriviaId($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.TriviaId = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult()
        ;
    }
    

    /*
    public function findOneBySomeField($value): ?Rankings
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function findTriviaByUserIdTriviaId($userId,$triviaId): ?Rankings
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.UserId = :val1','l.TriviaId = :val2')
            ->setParameter('val1', $userId)
            ->setParameter('val2',$triviaId)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
