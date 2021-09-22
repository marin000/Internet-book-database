<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210707173920 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trivia ADD answer1 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD answer2 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD answer3 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD answer4 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD answer5 VARCHAR(255) NOT NULL, ADD answer6 VARCHAR(255) NOT NULL, ADD answer7 VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trivia DROP answer1, DROP answer2, DROP answer3, DROP answer4, DROP answer5, DROP answer6, DROP answer7');
    }
}
