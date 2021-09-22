<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210608215012 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE library DROP FOREIGN KEY FK_A18098BC9D86650F');
        $this->addSql('DROP INDEX IDX_A18098BC9D86650F ON library');
        $this->addSql('ALTER TABLE library CHANGE user_id_id user_id INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE library CHANGE user_id user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE library ADD CONSTRAINT FK_A18098BC9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_A18098BC9D86650F ON library (user_id_id)');
    }
}
