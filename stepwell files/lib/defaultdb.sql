

DELIMITER $$
--
-- Procedures
--
CREATE PROCEDURE `addGroupMember` (IN `zgroupid` VARCHAR(50), IN `zmemberid` VARCHAR(50))  BEGIN
    INSERT into tbl_group_member values(zgroupid, zmemberid);
END$$

CREATE PROCEDURE `checkIfDocumentHistoryExists` (IN `zdocid` VARCHAR(50), IN `zaccid` VARCHAR(50), IN `zrole` VARCHAR(50))  BEGIN
    SELECT url FROM tbl_document_history 
    WHERE docid = zdocid 
    AND accid = zaccid 
    AND role = zrole;
END$$

CREATE PROCEDURE `createAccount` (IN `zid` VARCHAR(50), IN `zcompanyid` VARCHAR(50), IN `zemail` VARCHAR(50), IN `zpassword` VARCHAR(50), IN `zuserlevel` VARCHAR(50), IN `zlastname` VARCHAR(50), IN `zfirstname` VARCHAR(50), IN `zphone` VARCHAR(50), IN `zbirthdate` VARCHAR(50), IN `zposition` VARCHAR(50), IN `zdepartment` VARCHAR(50), IN `zsuperid` VARCHAR(50))  BEGIN
    INSERT INTO tbl_account VALUES (zid, zcompanyid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment, 'na');
    INSERT INTO tbl_account_supervisor VALUES (zid, zsuperid);
END$$

CREATE PROCEDURE `createAccountMachine` (IN `zmachineid` VARCHAR(50), IN `zaccid` VARCHAR(50))  BEGIN
    INSERT INTO tbl_account_machine (machineid, accid) VALUES (zmachineid, zaccid);
END$$

CREATE PROCEDURE `createAccountModule` (IN `zid` VARCHAR(50), IN `zmodulename` VARCHAR(50), IN `zmoduleui` VARCHAR(50))  BEGIN
    INSERT INTO tbl_account_module VALUES(zid, zmodulename, zmoduleui);
END$$

CREATE PROCEDURE `createAccountRate` (IN `zid` VARCHAR(50), IN `zaccid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zrate` VARCHAR(50))  BEGIN
IF ( (SELECT COUNT(id) FROM tbl_account_rate WHERE id = zid) > 0 ) THEN
    BEGIN
    	 UPDATE tbl_account_rate SET rate = zrate WHERE id = zid ;
    END;
    ELSE 
    BEGIN
    	INSERT INTO tbl_account_rate (id, accid, projectid, rate) VALUES (zid, zaccid, zprojectid, zrate);
    END;
END IF;
END$$

CREATE PROCEDURE `createAccountSupervisor` (IN `zaccid` VARCHAR(50), IN `zsuperid` VARCHAR(50))  BEGIN
    INSERT INTO tbl_account_supervisor (accid, superid) VALUES (zaccid, zsuperid);
END$$

CREATE PROCEDURE `createCompanyModule` (IN `zcomid` VARCHAR(50), IN `zmodulename` VARCHAR(50), IN `zmoduleui` VARCHAR(50))  BEGIN
    INSERT INTO tbl_company_module VALUES(zcomid, zmodulename, zmoduleui);
END$$

CREATE PROCEDURE `createDepartment` (IN `zid` VARCHAR(50), IN `zcomid` VARCHAR(50), IN `ztitle` VARCHAR(50))  BEGIN
    INSERT into tbl_department values(zid, zcomid, ztitle);
END$$

CREATE PROCEDURE `createDocument` (IN `zdocid` VARCHAR(30), IN `zcomid` VARCHAR(30), IN `zdocsuff` VARCHAR(10), IN `zcat1` INT(10), IN `zcat2` INT(10), IN `zcat3` INT(10), IN `zcat4` INT(10), IN `zownerid` VARCHAR(30), IN `ztitle` VARCHAR(50), IN `zurl` VARCHAR(50), IN `zversion` VARCHAR(30), IN `zstatus` VARCHAR(30), IN `zreference` VARCHAR(50), IN `zprojectid` VARCHAR(50))  BEGIN
    INSERT INTO tbl_document (docid, comid, docsuff, cat1, cat2, cat3, cat4, ownerid, title, url, version, status, reference, projectid, draftstamp) VALUES (zdocid, zcomid, zdocsuff, zcat1, zcat2, zcat3, zcat4, zownerid, ztitle, zurl, zversion, zstatus, zreference, zprojectid, curdate());
END$$

CREATE PROCEDURE `createDocumentBank` (IN `zdocid` VARCHAR(50), IN `zcomid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zownerid` VARCHAR(50), IN `zcat1` INT(10), IN `zcat2` INT(10), IN `zcat3` INT(10), IN `zcat4` INT(10), IN `ztitle` VARCHAR(500), IN `zurl` VARCHAR(100), IN `zversion` VARCHAR(30), IN `zreference` VARCHAR(100))  BEGIN
    INSERT INTO tbl_document_bank (docid, comid, projectid, ownerid, cat1, cat2, cat3, cat4, title, url, version, reference, stamp)
	VALUES (zdocid, zcomid, zprojectid, zownerid, zcat1, zcat2, zcat3, zcat4, ztitle, zurl, zversion, zreference, CURDATE() + INTERVAL 1 DAY);
END$$

CREATE PROCEDURE `createDocumentCategory` (IN `zid` VARCHAR(50), IN `zcompanyid` VARCHAR(50), IN `zname` VARCHAR(50), IN `zordernum` INT(15), IN `zcatnum` INT(15))  BEGIN
   INSERT INTO tbl_document_category values(zid, zcompanyid, zname, zordernum, zcatnum);
END$$

CREATE PROCEDURE `createDocumentConnect` (IN `zaccid` VARCHAR(50), IN `zdocid` VARCHAR(50), IN `zcomid` VARCHAR(50), IN `zrole` VARCHAR(50))  BEGIN
    INSERT INTO tbl_document_connect VALUES (zaccid, zdocid, zcomid, zrole, DEFAULT);
    
    IF STRCMP(zrole, 'draft') THEN
    
        INSERT INTO tbl_document_history (id, docid, accid, role, docstatus, notes, url, version, reason, `status`, `date`)
    VALUES (concat('DH-', FLOOR(RAND()*(9-0)), FLOOR(RAND()*(9-0)), FLOOR(RAND()*(9-0)), FLOOR(RAND()*(9-0)), FLOOR(RAND()*(9-0)), FLOOR(RAND()*(9-0)), FLOOR(RAND()*(9-0)), FLOOR(RAND()*(9-0)), FLOOR(RAND()*(9-0)) ), 
            zdocid, zaccid, zrole, DEFAULT, 'na', 'na', 'na', 'na', 'na', DEFAULT);
    
    END IF;
    
    

END$$

CREATE PROCEDURE `createDocumentHistory` (IN `zid` VARCHAR(30), IN `zdocid` VARCHAR(30), IN `zaccid` VARCHAR(30), IN `zversion` VARCHAR(30), IN `zstatus` VARCHAR(30), IN `zurl` VARCHAR(50), IN `znotes` VARCHAR(500), IN `zreason` VARCHAR(500))  BEGIN
    INSERT INTO tbl_document_history VALUES (zid, zdocid, zaccid, zversion, zstatus, zurl, znotes, zreason, CURDATE());
END$$

CREATE PROCEDURE `createGroup` (IN `zgroupid` VARCHAR(50), IN `zgroupname` VARCHAR(50), IN `zowner` VARCHAR(50), IN `zcomid` VARCHAR(30))  BEGIN
    INSERT into tbl_group values(zgroupid, zgroupname, zowner, zcomid);
    INSERT into tbl_group_member values(zgroupid, zowner);
END$$

CREATE PROCEDURE `createPlanningConnect` (IN `zdocid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `ztitle` VARCHAR(50))  BEGIN
INSERT INTO tbl_planning_connect (docid, projectid, title, mapid)
VALUES (zdocid, zprojectid, ztitle, DEFAULT);
END$$

CREATE PROCEDURE `createPlanningDocument` (IN `zplanid` VARCHAR(50), IN `ztitle` VARCHAR(50), IN `zprojectid` VARCHAR(50))  BEGIN
	INSERT INTO tbl_planning_document (docid) VALUES (zplanid);
	INSERT INTO tbl_planning_connect (docid, projectid, title) VALUES (zplanid, zprojectid, ztitle);
END$$

CREATE PROCEDURE `createPlanningDocumentLink` (IN `zlinkid` VARCHAR(50), IN `zdocid` VARCHAR(50), IN `zstage` VARCHAR(50))  BEGIN
IF ( (SELECT COUNT(*) FROM tbl_planning_document_link WHERE linkid = zlinkid AND docid = zdocid AND stage = zstage) = 0 ) THEN
    BEGIN
        INSERT INTO tbl_planning_document_link (linkid, docid, stage) VALUES (zlinkid, zdocid, zstage);
    END;
END IF;

	UPDATE tbl_planning_document as pd
    SET pd.linkid = zlinkid
    WHERE pd.docid = zdocid;

END$$

CREATE PROCEDURE `createPlanningDocumentPredecessor` (IN `zdocid` VARCHAR(30), IN `zpredid` VARCHAR(30), IN `zstage` VARCHAR(30), IN `zpreddocid` VARCHAR(30))  BEGIN
IF ( (SELECT COUNT(*) FROM tbl_planning_document_producessor WHERE producessorid = zpredid AND docid = zdocid AND stage = zstage AND preddocid = zpreddocid) = 0 ) THEN
    BEGIN
        INSERT INTO tbl_planning_document_producessor (producessorid, docid,preddocid, stage) VALUES (zpredid, zdocid, zpreddocid, zstage);
    END;
END IF;

	UPDATE tbl_planning_document as pd
    SET pd.producessorid = zpredid
    WHERE pd.docid = zdocid;

END$$

CREATE PROCEDURE `createPlanningDocumentTask` (IN `ztaskid` VARCHAR(30), IN `zdocid` VARCHAR(30), IN `ztaskname` VARCHAR(50), IN `zsd` DATE, IN `zed` DATE)  BEGIN
INSERT into tbl_planning_document_task (taskid, docid, taskname, startdate, enddate)
values (ztaskid, zdocid, ztaskname, zsd, zed);
END$$

CREATE PROCEDURE `createPlanningDocumentUpdated` (IN `zprojectid` VARCHAR(30), IN `zdocid` VARCHAR(30), IN `ztitle` VARCHAR(30), IN `zdraftsd` VARCHAR(30), IN `zdrafted` VARCHAR(30), IN `zreviewed` VARCHAR(30), IN `zapprovaled` VARCHAR(30), IN `zexecutioned` VARCHAR(30), IN `zpostapprovaled` VARCHAR(30), IN `zmilestone` VARCHAR(30), IN `zlinkid` VARCHAR(30), IN `zlinkstage` VARCHAR(30), IN `zproducessorid` VARCHAR(30), IN `zproducessorstage` VARCHAR(30))  MODIFIES SQL DATA
BEGIN
	INSERT INTO tbl_planning_document(docid,projectid,title,approvaled, draftsd, drafted, reviewed, executioned, postapprovaled, mapid,linkid, producessorid,milestone) 
    VALUES (zdocid,zprojectid,ztitle,zapprovaled,zdraftsd,zdrafted,zreviewed,zexecutioned,zpostapprovaled,NULL,zlinkid,zproducessorid,zmilestone);
    INSERT INTO tbl_planning_document_link (linkid, docid, stage)
    VALUES (zlinkid, zdocid, zlinkstage);
    INSERT INTO tbl_planning_document_producessor(producessorid, docid, stage)
    VALUES (zproducessorid, zdocid, zproducessorstage);
    
END$$

CREATE PROCEDURE `createPlanningScheduleByDocId` (IN `zdocid` VARCHAR(50), IN `zdraftsd` VARCHAR(30), IN `zdrafted` VARCHAR(30), IN `zreviewed` VARCHAR(30), IN `zapprovaled` VARCHAR(30), IN `zexecutioned` VARCHAR(30), IN `zpostapprovaled` VARCHAR(30))  BEGIN
INSERT INTO tbl_planning_document(docid, draftsd, drafted, reviewed,approvaled, executioned,postapprovaled)
VALUES (zdocid,zdraftsd,zdrafted,zreviewed,zapprovaled,zexecutioned,zpostapprovaled);
END$$

CREATE PROCEDURE `createPlanningTestSchedule` (IN `zscheduleid` VARCHAR(50), IN `ztempscheduleid` VARCHAR(50), IN `zownerid` VARCHAR(50), IN `ztitle` VARCHAR(50))  BEGIN
    INSERT INTO tbl_planning_schedule (scheduleid, ownerid, title) VALUES (zscheduleid, zownerid, ztitle);
    UPDATE tbl_planning_connect SET projectid = zscheduleid WHERE projectid = ztempscheduleid;
END$$

CREATE PROCEDURE `createPosition` (IN `zid` VARCHAR(50), IN `zcomid` VARCHAR(50), IN `ztitle` VARCHAR(50))  BEGIN
    INSERT into tbl_position values(zid, zcomid, 'na', ztitle);
END$$

CREATE PROCEDURE `createProject` (IN `zprojectid` VARCHAR(50), IN `zprojectname` VARCHAR(50), IN `zowner` VARCHAR(50), IN `zcompanyid` VARCHAR(50), IN `zreference` VARCHAR(100), IN `zcreator` VARCHAR(50))  BEGIN
    INSERT into tbl_project values(zprojectid, zprojectname, zowner, zcreator, zcompanyid, zreference, DEFAULT, DEFAULT);
    INSERT INTO tbl_project_connect values(zprojectid, zowner);
    INSERT INTO tbl_project_info (projectid) values(zprojectid);
END$$

CREATE PROCEDURE `createProjectBudgetAForecast` (IN `zid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zresourceid` VARCHAR(50), IN `zyear` VARCHAR(50), IN `ztype` VARCHAR(50), IN `zm1` VARCHAR(50), IN `zm2` VARCHAR(50), IN `zm3` VARCHAR(50), IN `zm4` VARCHAR(50), IN `zm5` VARCHAR(50), IN `zm6` VARCHAR(50), IN `zm7` VARCHAR(50), IN `zm8` VARCHAR(50), IN `zm9` VARCHAR(50), IN `zm10` VARCHAR(50), IN `zm11` VARCHAR(50), IN `zm12` VARCHAR(50))  BEGIN
   IF ( (SELECT COUNT(id) FROM tbl_project_budget_forecast WHERE id = zid) > 0 ) THEN
        BEGIN
            UPDATE tbl_project_budget_forecast SET 
            `m1` = zm1, 
            `m2` = zm2, 
            `m3` = zm3, 
            `m4` = zm4, 
            `m5` = zm5, 
            `m6` = zm6, 
            `m7` = zm7, 
            `m8` = zm8, 
            `m9` = zm9, 
            `m10` = zm10, 
            `m11` = zm11, 
            `m12` = zm12
                WHERE id = zid;
        END;
        ELSE 
        BEGIN
            INSERT INTO tbl_project_budget_forecast ( id, projectid, resourceid, year, type, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12) 
            VALUES ( zid, zprojectid, zresourceid, zyear, ztype, zm1, zm2, zm3, zm4, zm5, zm6, zm7, zm8, zm9, zm10, zm11, zm12);
        END;
    END IF;
END$$

CREATE PROCEDURE `createProjectBudgetLumpsum` (IN `zid` VARCHAR(50), IN `zbudgetid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zname` VARCHAR(200), IN `zpayment` VARCHAR(50))  BEGIN
IF ( (SELECT COUNT(id) FROM tbl_project_budget_lumpsum WHERE id = zid) > 0 ) THEN
    BEGIN
        UPDATE tbl_project_budget_lumpsum SET `name` = zname, `payment` = zpayment WHERE id = zid;
    END;
ELSE 
	BEGIN
		INSERT INTO tbl_project_budget_lumpsum ( id, budgetid, projectid, `name`, `payment`) VALUES ( zid, zbudgetid, zprojectid, zname, zpayment);
	END;
END IF;
    
END$$

CREATE PROCEDURE `createProjectBudgetManhours` (IN `zid` VARCHAR(50), IN `zbudgetid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zname` VARCHAR(200), IN `zrole` VARCHAR(50), IN `zhours` VARCHAR(50), IN `zrate` VARCHAR(50))  BEGIN
    IF ( (SELECT COUNT(id) FROM tbl_project_budget_manhours WHERE id = zid) > 0 ) THEN
        BEGIN
            UPDATE tbl_project_budget_manhours SET `name` = zname, `role` = zrole, `hours` = zhours, `rate` = zrate WHERE id = zid;
        END;
        ELSE 
        BEGIN
            INSERT INTO tbl_project_budget_manhours ( id, budgetid, projectid, `name`, `role`, `hours`, `rate`) 
            VALUES ( zid, zbudgetid, zprojectid, zname, zrole, zhours, zrate);
        END;
    END IF; 

END$$

CREATE PROCEDURE `createProjectBudgetMaterial` (IN `zid` VARCHAR(50), IN `zbudgetid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zname` VARCHAR(50), IN `zunit` VARCHAR(50), IN `zquantity` VARCHAR(50), IN `zprice` VARCHAR(50))  BEGIN
    IF ( (SELECT COUNT(id) FROM tbl_project_budget_material WHERE id = zid) > 0 ) THEN
        BEGIN
            UPDATE tbl_project_budget_material SET `name` = zname, `unit` = zunit, `quantity` = zquantity, `price` = zprice WHERE id = zid;
        END;
    ELSE 
        BEGIN
            INSERT INTO tbl_project_budget_material ( id, budgetid, projectid, `name`, `unit`, `quantity`, `price`) VALUES ( zid, zbudgetid, zprojectid, zname, zunit, zquantity, zprice);
        END;
    END IF;
END$$

CREATE PROCEDURE `createProjectBudgetMilestone` (IN `zid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zbudgetid` VARCHAR(50), IN `zresourceid` VARCHAR(50), IN `zmilestoneid` VARCHAR(50), IN `zname` VARCHAR(200), IN `zvalue` VARCHAR(50))  BEGIN
   IF ( (SELECT COUNT(id) FROM tbl_project_budget_milestone WHERE id = zid) > 0 ) THEN
        BEGIN
            UPDATE tbl_project_budget_milestone SET `name` = zname, `value` = zvalue WHERE id = zid;
        END;
        ELSE 
        BEGIN
            INSERT INTO tbl_project_budget_milestone ( id, projectid, budgetid, resourceid, milestoneid, `name`, `value`) 
            VALUES ( zid, zprojectid, zbudgetid, zresourceid, zmilestoneid, zname, zvalue);
        END;
    END IF;
END$$

CREATE PROCEDURE `createProjectConnect` (IN `zprojectid` VARCHAR(50), IN `zid` VARCHAR(50))  BEGIN
    INSERT into tbl_project_connect values(zprojectid, zid);
END$$

CREATE PROCEDURE `createProjectInvoiceForecast` (IN `zid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zresourceid` VARCHAR(50), IN `zyear` VARCHAR(50), IN `ztype` VARCHAR(50), IN `zm1` VARCHAR(50), IN `zm2` VARCHAR(50), IN `zm3` VARCHAR(50), IN `zm4` VARCHAR(50), IN `zm5` VARCHAR(50), IN `zm6` VARCHAR(50), IN `zm7` VARCHAR(50), IN `zm8` VARCHAR(50), IN `zm9` VARCHAR(50), IN `zm10` VARCHAR(50), IN `zm11` VARCHAR(50), IN `zm12` VARCHAR(50))  BEGIN
   IF ( (SELECT COUNT(id) FROM tbl_project_invoice_forecast WHERE id = zid) > 0 ) THEN
        BEGIN
            UPDATE tbl_project_invoice_forecast SET 
            `m1` = zm1, 
            `m2` = zm2, 
            `m3` = zm3, 
            `m4` = zm4, 
            `m5` = zm5, 
            `m6` = zm6, 
            `m7` = zm7, 
            `m8` = zm8, 
            `m9` = zm9, 
            `m10` = zm10, 
            `m11` = zm11, 
            `m12` = zm12
                WHERE id = zid;
        END;
        ELSE 
        BEGIN
            INSERT INTO tbl_project_invoice_forecast ( id, projectid, resourceid, year, type, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12) 
            VALUES ( zid, zprojectid, zresourceid, zyear, ztype, zm1, zm2, zm3, zm4, zm5, zm6, zm7, zm8, zm9, zm10, zm11, zm12);
        END;
    END IF;
END$$

CREATE PROCEDURE `createProjectInvoiceMilestone` (IN `zid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zinvoiceid` VARCHAR(50), IN `zmilestoneid` VARCHAR(50), IN `zresourceid` VARCHAR(50), IN `zhours` VARCHAR(50))  BEGIN
    IF ( (SELECT COUNT(id) FROM tbl_project_invoice_milestone WHERE id = zid) > 0 ) THEN
            BEGIN
                UPDATE tbl_project_invoice_milestone SET `hours` = zhours WHERE id = zid;
            END;
            ELSE 
            BEGIN
                INSERT INTO tbl_project_invoice_milestone ( id, projectid, invoiceid, milestoneid, resourceid, `hours`) 
        		VALUES ( zid, zprojectid, zinvoiceid, zmilestoneid, zresourceid, zhours );
            END;
        END IF;
END$$

CREATE PROCEDURE `createProjectMinutes` (IN `zid` VARCHAR(50), IN `zpartid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zownerid` VARCHAR(50), IN `zdate` VARCHAR(50), IN `ztime` VARCHAR(50), IN `zsubject` VARCHAR(100), IN `ztype` VARCHAR(50), IN `zmode` VARCHAR(50), IN `zlocation` VARCHAR(100), IN `zattendees` VARCHAR(200), IN `zresponsible` VARCHAR(50), IN `zrespotype` VARCHAR(50), IN `zrespohours` VARCHAR(50), IN `zdue` VARCHAR(50), IN `zdescription` VARCHAR(500))  BEGIN
    INSERT INTO tbl_project_minutes (id, partid, projectid, ownerid, `date`, `time`, subject, type, `mode`, location, attendees, responsible, respotype, respohours, due, description) 
    VALUES (zid, zpartid, zprojectid, zownerid, zdate, ztime, zsubject, ztype, zmode, zlocation, zattendees, zresponsible, zrespotype, zrespohours, zdue, zdescription);

END$$

CREATE PROCEDURE `createProjectProduct` (IN `zproductid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zproductname` VARCHAR(50))  BEGIN
    INSERT into tbl_project_product values(zproductid, zprojectid, zproductname);
END$$

CREATE PROCEDURE `createProjectRegister` (IN `zid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zownerid` VARCHAR(50), IN `zdate` VARCHAR(50), IN `ztime` VARCHAR(50), IN `zsubject` VARCHAR(300), IN `ztype` VARCHAR(50), IN `zmode` VARCHAR(50), IN `zimpact` VARCHAR(50), IN `zimpdescription` VARCHAR(500), IN `zdescription` VARCHAR(500))  BEGIN
    INSERT INTO tbl_project_register (id, projectid, ownerid, `date`, `time`, subject, type, `mode`, impact, impdescription, description) VALUES (zid, zprojectid, zownerid, zdate, ztime, zsubject, ztype, zmode, zimpact, zimpdescription, zdescription);
END$$

CREATE PROCEDURE `createProjectRequest` (IN `zrequestid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zname` VARCHAR(200), IN `zscore` VARCHAR(200), IN `zdescription` VARCHAR(500), IN `zlocation1` VARCHAR(200), IN `zlocation2` VARCHAR(200), IN `zrequestor` VARCHAR(50), IN `zmanager` VARCHAR(50), IN `zsponsor` VARCHAR(20))  BEGIN
    IF ( (SELECT COUNT(requestid) FROM tbl_project_request WHERE requestid = zrequestid) > 0 ) THEN
    BEGIN
    	UPDATE tbl_project_request 
        SET name = zname,
        score = zscore,
        description = zdescription,
        location1 = zlocation1,
        location2 = zlocation2,
        requestor = zrequestor,
        manager = zmanager,
        sponsor = zsponsor
        WHERE requestid = zrequestid;
    END;
    ELSE 
    BEGIN
    	INSERT INTO tbl_project_request (requestid, projectid, name, `status`, score, description, location1, location2, requestor, manager, sponsor) 
    VALUES (zrequestid, zprojectid, zname, DEFAULT, zscore, zdescription, zlocation1, zlocation2, zrequestor, zmanager, zsponsor);
    END;
END IF;
   
END$$

CREATE PROCEDURE `createProjectRequestScore` (IN `zrequestid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zcolumnname` VARCHAR(50), IN `zvalue` VARCHAR(50))  BEGIN

    IF ( (SELECT COUNT(requestid) FROM tbl_project_request_score WHERE requestid = zrequestid) > 0 ) THEN
    BEGIN
    	SET @s = CONCAT( "UPDATE tbl_project_request_score SET ", zcolumnname , " = '", zvalue ,"' WHERE requestid = '", zrequestid, "'; ");
        PREPARE stmt FROM @s;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END;
    ELSE 
    BEGIN
    	INSERT INTO tbl_project_request_score (requestid, projectid) VALUES (zrequestid, zprojectid);
        SET @s = CONCAT( "UPDATE tbl_project_request_score SET ", zcolumnname , " = '", zvalue ,"' WHERE requestid = '", zrequestid, "'; ");
        PREPARE stmt FROM @s;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END;
END IF;
    
    
END$$

CREATE PROCEDURE `createProjectRequestScoreAdd` (IN `zid` VARCHAR(50), IN `zrequestid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zscore` VARCHAR(50))  BEGIN

    IF ( (SELECT COUNT(id) FROM tbl_project_request_score_add WHERE id = zid) > 0 ) THEN
    BEGIN
    	UPDATE tbl_project_request_score_add SET score = zscore WHERE id = zid;
    END;
    ELSE 
    BEGIN
    	INSERT INTO tbl_project_request_score_add (id, requestid, projectid, score) VALUES (zid, zrequestid, zprojectid, zscore);
    END;
END IF;
    
    
END$$

CREATE PROCEDURE `createProjectRequestTechnical` (IN `zrequestid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zdesc_1` VARCHAR(500), IN `zdesc_2` VARCHAR(500), IN `zdesc_3` VARCHAR(500), IN `zdesc_4_1` VARCHAR(500), IN `zdesc_4_2` VARCHAR(500), IN `zprior_1` VARCHAR(500), IN `zprior_2` VARCHAR(500), IN `zprior_3` VARCHAR(500), IN `zprior_4` VARCHAR(500), IN `zprior_5` VARCHAR(500), IN `zprior_6` VARCHAR(500), IN `zprior_7` VARCHAR(500), IN `zprior_8` VARCHAR(500), IN `zstrat_1` VARCHAR(500), IN `zstrat_2` VARCHAR(500))  BEGIN
IF ( (SELECT COUNT(zrequestid) FROM tbl_project_request_technical WHERE requestid = zrequestid) > 0 ) THEN
    BEGIN
    	 UPDATE tbl_project_request_technical SET 
         	desc_1 = zdesc_1,
            desc_2 = zdesc_2,
            desc_3 = zdesc_3,
            desc_4_1 = zdesc_4_1,
            desc_4_2 = zdesc_4_2,
            prior_1 = zprior_1,
            prior_2 = zprior_2,
            prior_3 = zprior_3,
            prior_4 = zprior_4,
            prior_5 = zprior_5,
            prior_6 = zprior_6,
            prior_7 = zprior_7,
            prior_8 = zprior_8,
            strat_1 = zstrat_1,
            strat_2 = zstrat_2 
            WHERE requestid = zrequestid;
    END;
    ELSE 
    BEGIN
    	INSERT INTO tbl_project_request_technical (requestid, projectid, desc_1, desc_2, desc_3, desc_4_1, desc_4_2, prior_1, prior_2, prior_3, prior_4, prior_5, prior_6, prior_7, prior_8, strat_1, strat_2) 
        VALUES (zrequestid, zprojectid, zdesc_1, zdesc_2, zdesc_3, zdesc_4_1, zdesc_4_2, zprior_1, zprior_2, zprior_3, zprior_4, zprior_5, zprior_6, zprior_7, zprior_8, zstrat_1, zstrat_2);
    END;
END IF;
    
END$$

CREATE PROCEDURE `createProjectTimesheet` (IN `zid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zownerid` VARCHAR(50), IN `ztaskid` VARCHAR(50), IN `zdate` VARCHAR(50), IN `zhours` VARCHAR(50))  BEGIN
    INSERT INTO tbl_project_timesheet (id, projectid, ownerid, taskid, `date`, hours) VALUES (zid, zprojectid, zownerid, ztaskid, zdate, zhours);
END$$

CREATE PROCEDURE `createRequestConnect` (IN `zrequestid` VARCHAR(50), IN `zaccid` VARCHAR(50))  BEGIN
    INSERT INTO tbl_project_request_connect (requestid, accid) VALUES (zrequestid, zaccid);
END$$

CREATE PROCEDURE `createRequestTechnicalAdd` (IN `zid` VARCHAR(50), IN `zrequestid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `ztype` VARCHAR(50), IN `zsubject` VARCHAR(200), IN `zparam` VARCHAR(500))  BEGIN
    IF ( (SELECT COUNT(zid) FROM tbl_project_request_technical_add WHERE id = zid) > 0 ) THEN
    BEGIN
    	 UPDATE tbl_project_request_technical_add SET subject = zsubject, param = zparam WHERE id = zid;
    END;
    ELSE 
    BEGIN
    	INSERT INTO tbl_project_request_technical_add (id, requestid, projectid, type, subject, param) VALUES (zid, zrequestid, zprojectid, ztype, zsubject, zparam);
    END;
END IF;
    
END$$

CREATE PROCEDURE `createSkid` (IN `zid` VARCHAR(30), IN `zcomid` VARCHAR(30), IN `zowner` VARCHAR(30), IN `zname` VARCHAR(30))  BEGIN
    INSERT INTO tbl_skid values(zid, zcomid, zowner, zname, DEFAULT);
END$$

CREATE PROCEDURE `createSkidEquipmentSpecs` (IN `zid` VARCHAR(30), IN `ztag` VARCHAR(30), IN `zquantity` VARCHAR(30), IN `zcapacity` VARCHAR(30), IN `ztank` VARCHAR(30), IN `zroom` VARCHAR(30), IN `zdimensions` VARCHAR(30))  BEGIN
    INSERT INTO tbl_skid_equipment_specs values(zid, ztag, zquantity,zcapacity, ztank, zroom, zdimensions);
END$$

CREATE PROCEDURE `createSkidEquipmentSpecsCost` (IN `zid` VARCHAR(30), IN `zcost` VARCHAR(30))  BEGIN
    INSERT INTO tbl_skid_equipment_specs_cost values(zid, zcost);
END$$

CREATE PROCEDURE `createSkidOperation` (IN `zid` VARCHAR(30), IN `zcomid` VARCHAR(30), IN `zname` VARCHAR(50))  BEGIN
    INSERT INTO tbl_skid_operations values(zid, zcomid, zname);
END$$

CREATE PROCEDURE `createSkidSubOperation` (IN `zid` VARCHAR(50), IN `zcomid` VARCHAR(50), IN `zmain` VARCHAR(50), IN `zname` VARCHAR(50))  BEGIN
    INSERT INTO tbl_skid_suboperations (id, comid, main, name) VALUES (zid, zcomid, zmain, zname);
END$$

CREATE PROCEDURE `createSkidUnitSpecs` (IN `zid` VARCHAR(30), IN `ztag` VARCHAR(30), IN `zname` VARCHAR(30))  BEGIN
    INSERT INTO tbl_skid_unit_specs values(zid, ztag, zname);
END$$

CREATE PROCEDURE `createSupplier` (IN `zsupplierid` VARCHAR(50), IN `zcompanyid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zname` VARCHAR(200))  BEGIN
    IF ( (SELECT COUNT(supplierid) FROM tbl_supplier WHERE supplierid = zsupplierid ) > 0 ) THEN
    BEGIN
    	 UPDATE tbl_supplier SET name = zname WHERE supplierid = zsupplierid ;
    END;
    ELSE 
    BEGIN
    	INSERT INTO tbl_supplier (supplierid, companyid, projectid, name) VALUES (zsupplierid, zcompanyid, zprojectid, zname);
    END;
END IF;
END$$

CREATE PROCEDURE `createSupplierRate` (IN `zid` VARCHAR(50), IN `zsupplierid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `ztype` VARCHAR(50), IN `zrate` VARCHAR(50))  BEGIN
IF ( (SELECT COUNT(id) FROM tbl_supplier_rate WHERE id = zid) > 0 ) THEN
    BEGIN
    	 UPDATE tbl_supplier_rate SET rate = zrate WHERE id = zid;
    END;
    ELSE 
    BEGIN
    	INSERT INTO tbl_supplier_rate (id, supplierid, projectid, type, rate) 
        VALUES (zid, zsupplierid, zprojectid, ztype, zrate);
    END;
END IF;
END$$

CREATE PROCEDURE `createTask` (IN `ztaskid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `zplanid` VARCHAR(50), IN `ztaskname` VARCHAR(100), IN `zstartdate` VARCHAR(50), IN `zenddate` VARCHAR(50))  BEGIN

   IF ( (SELECT COUNT(taskid) FROM tbl_task WHERE taskid = ztaskid AND projectid = zprojectid AND planid = zplanid)>0 ) THEN
    BEGIN
         UPDATE tbl_task SET taskname = ztaskname, startdate = zstartdate, enddate = zenddate WHERE taskid = ztaskid AND projectid = zprojectid AND planid = zplanid;
    END;
    ELSE 
    BEGIN
        INSERT INTO tbl_task (taskid, projectid, planid, `status`, taskname, startdate, enddate) VALUES (ztaskid, zprojectid, zplanid, DEFAULT, ztaskname, zstartdate, zenddate);
    END;
END IF;

END$$

CREATE PROCEDURE `createTaskResource` (IN `zid` VARCHAR(50), IN `ztaskid` VARCHAR(50), IN `ztype` VARCHAR(30), IN `zprojectid` VARCHAR(50), IN `zsupplierid` VARCHAR(50), IN `zaccid` VARCHAR(50), IN `zhours` INT(200), IN `zplanid` VARCHAR(50))  BEGIN
IF(STRCMP(ztype, 'hours') = 0) THEN
    INSERT INTO tbl_task_resource(id, type, projectid, planid, taskid, accid, supplierid, hours, status, suggesteddate, assignment, usercomment, pmcomment, usrread, pmread) VALUES ( zid, ztype, zprojectid, zplanid, ztaskid, zaccid, DEFAULT, zhours, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT);
ELSEIF(STRCMP(ztype, 'supplier') = 0) THEN
    INSERT INTO tbl_task_resource(id, type, projectid, planid, taskid, accid, supplierid, hours, status, suggesteddate, assignment, usercomment, pmcomment, usrread, pmread) VALUES ( zid, ztype, zprojectid, zplanid, ztaskid, DEFAULT, zsupplierid, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT);
ELSEIF(STRCMP(ztype, 'tm') = 0) THEN
    INSERT INTO tbl_task_resource(id, type, projectid, planid, taskid, accid, supplierid, hours, status, suggesteddate, assignment, usercomment, pmcomment, usrread, pmread) VALUES ( zid, ztype, zprojectid, zplanid, ztaskid, DEFAULT, zsupplierid, zhours, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT);
END IF;

END$$

CREATE PROCEDURE `deleteAccount` (IN `zid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_account where id = zid;
END$$

CREATE PROCEDURE `deleteAccountModule` (IN `zid` VARCHAR(50), IN `zmoduleui` VARCHAR(50))  BEGIN
    DELETE FROM tbl_account_module WHERE id = zid AND moduleui = zmoduleui;
END$$

CREATE PROCEDURE `deleteBudget` (IN `zid` VARCHAR(50))  BEGIN
DELETE FROM tbl_project_budget WHERE id = zid;
DELETE FROM tbl_project_budget_lumpsum WHERE budgetid = zid; 
DELETE FROM tbl_project_budget_manhours WHERE budgetid = zid; 
DELETE FROM tbl_project_budget_material WHERE budgetid = zid; 
DELETE FROM tbl_project_budget_milestone WHERE budgetid = zid;
DELETE FROM tbl_project_budget_upload WHERE budgetid = zid;
END$$

CREATE PROCEDURE `deleteCompanyModule` (IN `zcompanyid` VARCHAR(50), IN `zmoduleui` VARCHAR(50))  BEGIN
    DELETE FROM tbl_company_module WHERE companyid = zcompanyid AND moduleui = zmoduleui;
END$$

CREATE PROCEDURE `deleteDepartment` (IN `zid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_department where id = zid;
END$$

CREATE PROCEDURE `deleteDocument` (IN `zdocid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_document WHERE docid = zdocid;
    DELETE FROM tbl_document_connect WHERE docid = zdocid;
END$$

CREATE PROCEDURE `deleteDocumentCategoryTest` (IN `zcat` VARCHAR(50), IN `zordnum` VARCHAR(50))  BEGIN
    SET @s = CONCAT( "SELECT docid FROM tbl_document WHERE ", zcat, " = ", zordnum, ";" );
    PREPARE stmt FROM @s;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE `deleteDocumentConnect` (IN `zaccid` VARCHAR(50), IN `zdocid` VARCHAR(50), IN `zrole` VARCHAR(50))  BEGIN
    DELETE FROM tbl_document_connect WHERE accid = zaccid AND docid = zdocid AND role = zrole;
    DELETE FROM tbl_document_history WHERE accid = zaccid AND docid = zdocid AND role = zrole;
END$$

CREATE PROCEDURE `deleteDocumentConnectByDocid` (IN `zdocid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_document_connect WHERE docid = zdocid;
    DELETE FROM tbl_document_history WHERE docid = zdocid;
END$$

CREATE PROCEDURE `deleteDocumentLink` (IN `zlinkid` VARCHAR(30), IN `zdocid` VARCHAR(30), IN `zstage` VARCHAR(30))  MODIFIES SQL DATA
BEGIN
DELETE FROM tbl_planning_document_link WHERE linkid = zlinkid AND docid = zdocid AND stage = zstage;

UPDATE tbl_planning_document
SET linkid = NULL
WHERE docid = zdocid;

END$$

CREATE PROCEDURE `deleteDocumentMapping` (IN `zplanid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_document_mapping WHERE planid = zplanid;
END$$

CREATE PROCEDURE `deleteGroup` (IN `zgroupid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_group where groupid = zgroupid;
    DELETE FROM tbl_group_member where groupid = zgroupid;
END$$

CREATE PROCEDURE `deleteMilestone` (IN `zdocid` VARCHAR(30))  BEGIN
UPDATE tbl_planning_document
SET milestone = null
WHERE docid = zdocid;
END$$

CREATE PROCEDURE `deletePlanningDocument` (IN `zplanid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_task WHERE planid = zplanid;
    DELETE FROM tbl_task_resource WHERE planid = zplanid;
    DELETE FROM tbl_planning_document WHERE docid = zplanid;
    
END$$

CREATE PROCEDURE `deletePlanningDocumentPredecessor` (IN `zdocid` VARCHAR(30), IN `zpredid` VARCHAR(30), IN `zstage` VARCHAR(30), IN `zpreddocid` VARCHAR(30))  NO SQL
BEGIN
    DELETE FROM tbl_planning_document_producessor
    WHERE producessorid = zpredid AND docid = zdocid AND
    stage = zstage AND preddocid = zpreddocid;

    If ((SELECT count(*) FROM tbl_planning_document_producessor 
         WHERE docid = zdocid) = 0) THEN
            BEGIN
                UPDATE tbl_planning_document
                SET producessorid = NULL
                WHERE docid = zdocid;
            END;
	END IF;
END$$

CREATE PROCEDURE `deletePlanningSchedule` (IN `zscheduleid` VARCHAR(50))  BEGIN
	DELETE tbl_planning_document, tbl_planning_connect
    FROM tbl_planning_connect
    INNER JOIN tbl_planning_document 
    ON tbl_planning_connect.docid = tbl_planning_document.docid
    WHERE tbl_planning_connect.projectid = 'SCH-043170575';
    
    DELETE tbl_planning_document_producessor, tbl_planning_connect
    FROM tbl_planning_connect
    INNER JOIN tbl_planning_document_producessor 
    ON tbl_planning_connect.docid = tbl_planning_document_producessor.docid
    WHERE tbl_planning_connect.projectid = 'SCH-043170575';
    
    DELETE tbl_planning_document_link, tbl_planning_connect
    FROM tbl_planning_connect
    INNER JOIN tbl_planning_document_link 
    ON tbl_planning_connect.docid = tbl_planning_document_link.docid
    WHERE tbl_planning_connect.projectid = 'SCH-043170575';
    
    

    DELETE FROM tbl_planning_schedule WHERE scheduleid = zscheduleid;
    DELETE FROM tbl_task WHERE projectid = zscheduleid;
    DELETE FROM tbl_task_resource WHERE projectid = zscheduleid;
END$$

CREATE PROCEDURE `deletePosition` (IN `zid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_position where id = zid;
END$$

CREATE PROCEDURE `deleteProject` (IN `zprojectid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_project where projectid = zprojectid;
    DELETE FROM tbl_project_connect where projectid = zprojectid;
    DELETE FROM tbl_project_info where projectid = zprojectid;
    DELETE FROM tbl_project_product where projectid = zprojectid;
END$$

CREATE PROCEDURE `deleteProjectMinutes` (IN `zid` VARCHAR(50))  BEGIN
    DELETE from tbl_project_minutes WHERE id = zid;
END$$

CREATE PROCEDURE `deleteProjectProduct` (IN `zproductid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_project_product where productid = zproductid;
END$$

CREATE PROCEDURE `deleteProjectRegister` (IN `zid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_project_register WHERE id = zid;
END$$

CREATE PROCEDURE `deleteProjectRequest` (IN `zrequestid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_project_request WHERE requestid = zrequestid;
    DELETE FROM tbl_project_request_connect WHERE requestid = zrequestid;
END$$

CREATE PROCEDURE `deleteProjectTimesheet` (IN `zid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_project_timesheet WHERE id = zid;
END$$

CREATE PROCEDURE `deleteSkid` (IN `zid` INT(50))  BEGIN
    DELETE FROM tbl_skid WHERE id = zid;
END$$

CREATE PROCEDURE `deleteSkidUnitCategory` (IN `zid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_skid_operations WHERE id = zid;
END$$

CREATE PROCEDURE `deleteSkidUnitSubcategory` (IN `zid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_skid_suboperations WHERE id = zid;
END$$

CREATE PROCEDURE `deleteSupplier` (IN `zsupplierid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_supplier WHERE supplierid = zsupplierid;
END$$

CREATE PROCEDURE `deleteTask` (IN `ztaskid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_task WHERE taskid = ztaskid;
END$$

CREATE PROCEDURE `deleteTaskResource` (IN `zid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_task_resource WHERE id = zid;
END$$

CREATE PROCEDURE `deleteTmpPlanningDocument` ()  BEGIN
DELETE tbl_planning_connect,tbl_planning_document FROM tbl_planning_connect
        INNER JOIN
    tbl_planning_document ON tbl_planning_document.docid = tbl_planning_connect.docid 
WHERE
    tbl_planning_connect.projectid  LIKE '%tmpSCH%';
END$$

CREATE PROCEDURE `distributeMinuteByPartId` (IN `zid` VARCHAR(50), IN `zprid` VARCHAR(50), IN `zpid` VARCHAR(50))  BEGIN

     INSERT INTO tbl_project_minutes_dist (id, projectid, partid)
     VALUES(zid,zprid,zpid);
END$$

CREATE PROCEDURE `fetchAccountByProjectConnect` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT a.* FROM tbl_account a, tbl_project_connect pc
    WHERE pc.id = a.id
    AND pc.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchAccountMachine` (IN `zmachineid` VARCHAR(50))  BEGIN
    SELECT am.accid as 'accid', a.firstname as 'firstname', a.email as 'email', a.photo as 'photo', c.logo as 'logo', c.companyid as 'companyid', c.name as 'companyname' FROM tbl_account a, tbl_account_machine am, tbl_company c 
    WHERE am.accid = a.id
    AND a.companyid = c.companyid
    AND am.machineid = zmachineid;
END$$

CREATE PROCEDURE `fetchAccountModule` (IN `zid` VARCHAR(50))  BEGIN
    SELECT * from tbl_account_module WHERE id = zid;
END$$

CREATE PROCEDURE `fetchAccountRatesByProjectId` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_account_rate WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchAccounts` (IN `zcomid` VARCHAR(50))  READS SQL DATA
BEGIN
    SELECT a.*, asup.superid FROM tbl_account AS a
	LEFT OUTER JOIN tbl_account_supervisor AS asup ON a.id = asup.accid
	WHERE a.companyid = zcomid;
END$$

CREATE PROCEDURE `fetchAccountsByProjectResource` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT DISTINCT a.id as 'accid', a.firstname as 'firstname', a.lastname as 'lastname', a.photo as 'photo' 
    FROM tbl_account a, tbl_task_resource tr 
    WHERE tr.accid = a.id 
    AND tr.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchAccountsByUserLevel` (IN `zcomid` VARCHAR(50), IN `zuserlevel` VARCHAR(50))  BEGIN

SELECT a.*, acs.superid 
    FROM tbl_account a, tbl_account_supervisor acs 
    WHERE a.id = acs.accid
    AND companyid = zcomid
    AND userlevel = zuserlevel;
END$$

CREATE PROCEDURE `fetchActualDocuments` (IN `zprojectid` VARCHAR(30))  READS SQL DATA
BEGIN
SELECT 
d.*, 
pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, pd.milestone,
plink.linkid, plink.stage as linkstage, pprod.producessorid, pprod.stage as predecessorstage
FROM tbl_document AS d 
Left outer JOIN tbl_planning_document as pd on d.mapid = pd.docid
LEFT OUTER JOIN tbl_planning_document_link AS plink ON plink.docid = pd.docid
LEFT OUTER JOIN tbl_planning_document_producessor AS pprod ON pprod.docid = pd.docid
WHERE d.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchActualDocumentsByProjectId` (IN `zprojectid` VARCHAR(30))  BEGIN
SELECT d.docid, d.title, d.mapid, pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, d.ownerid, d.status, d.draftstamp, d.proofreadstamp, d.reviewstamp, d.approvestamp, d.postapprovestamp
FROM (tbl_planning_connect AS pc RIGHT OUTER JOIN tbl_planning_document AS pd 
ON pc.docid = pd.docid) RIGHT OUTER JOIN tbl_document AS d ON pd.mapid = d.docid
WHERE pc.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchAllCompany` ()  BEGIN
    SELECT companyid, name from tbl_company;
END$$

CREATE PROCEDURE `fetchAvailableDocumentMap` (IN `zcomid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_document WHERE (status = 'proofread' OR status = 'review' OR status = 'approve') AND mapid IS NULL AND comid = zcomid;
END$$

CREATE PROCEDURE `fetchBuildSchedule` (IN `zprojectid` VARCHAR(30))  READS SQL DATA
(SELECT 
pc.docid AS planningid, pc.projectid, pc.title AS planningtitle,
pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, pd.mapid AS actualid, pd.milestone,
plink.linkid,plink.stage AS linkstage,
pprod.producessorid, pprod.stage AS producessorstage,
d.title AS actualtitle,
NULL AS taskid, NULL AS taskstatus, NULL AS taskname, NULL AS tasksd, NULL AS tasked
FROM (((((tbl_planning_connect AS pc)
INNER JOIN tbl_planning_document AS pd ON pd.docid = pc.docid)
LEFT OUTER JOIN tbl_planning_document_link AS plink ON plink.docid = pd.docid)
LEFT OUTER JOIN tbl_planning_document_producessor AS pprod ON pprod.docid = pd.docid)
LEFT OUTER JOIN tbl_document AS d ON pd.mapid = d.docid)
WHERE pc.projectid = zprojectid)
UNION
(SELECT 
t.planid AS planningid, t.projectid, NULL AS planningtitle,
NULL AS draftsd, NULL AS drafted, NULL AS reviewed, NULL AS approvaled, NULL AS executioned, NULL AS postapprovaled, NULL AS actualid, NULL AS milestone,
NULL AS linkid,NULL AS linkstage,
NULL AS producessorid, NULL AS producessorstage,
NULL AS actualtitle,
t.taskid, t.status AS taskstatus, t.taskname, t.startdate AS tasksd, t.enddate AS tasked
FROM tbl_task AS t WHERE projectid = zprojectid)$$

CREATE PROCEDURE `fetchCompanyModule` (IN `zcomid` VARCHAR(50))  BEGIN
    SELECT * from tbl_company_module WHERE companyid = zcomid;
END$$

CREATE PROCEDURE `fetchDepartments` (IN `zcomid` VARCHAR(50))  BEGIN
    select id, title from tbl_department where companyid = zcomid;
END$$

CREATE PROCEDURE `fetchDocumentByProjectId` (IN `zprojectid` VARCHAR(50), IN `zownerid` VARCHAR(50))  BEGIN
    SELECT docid, title, url, version, projectid
    FROM tbl_document 
    WHERE (ownerid = zownerid
    AND projectid = 'na')
    OR projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchDocumentCategory` (IN `zcompanyid` VARCHAR(50))  BEGIN
    SELECT id, name, ordernum, catnum FROM tbl_document_category WHERE companyid = zcompanyid ORDER BY ordernum ASC;
END$$

CREATE PROCEDURE `fetchDocumentConnect` (IN `zdocid` VARCHAR(50), IN `zcomid` VARCHAR(50))  BEGIN
    SELECT dc.accid as 'accid', dc.role as 'role', a.firstname as 'firstname', a.lastname as 'lastname' from tbl_document_connect dc, tbl_account a WHERE dc.docid = zdocid 
    AND dc.comid = zcomid 
    AND dc.accid = a.id
    ORDER BY role;
END$$

CREATE PROCEDURE `fetchDocumentConnectByAccid` (IN `zaccid` VARCHAR(50), IN `zcomid` VARCHAR(50))  BEGIN
    SELECT docid, role, `read` FROM tbl_document_connect WHERE accid = zaccid AND comid = zcomid;
END$$

CREATE PROCEDURE `fetchDocumentConnectRead` (IN `zaccid` VARCHAR(50), IN `zcomid` VARCHAR(50))  BEGIN
    SELECT `read`, docid, role FROM tbl_document_connect WHERE accid = zaccid AND comid = zcomid LIMIT 1;
END$$

CREATE PROCEDURE `fetchDocumentHistory` (IN `zdocid` VARCHAR(50))  BEGIN
    SELECT id, accid, notes, url, `status`, reason, `date`, role from tbl_document_history 
    WHERE docid = zdocid 
    AND url <> 'na'
    ORDER BY tbl_document_history.role;
END$$

CREATE PROCEDURE `fetchDocumentHistoryByAccid` (IN `zaccid` VARCHAR(50))  BEGIN
    SELECT dh.docid, dh.role, dh.docstatus, dh.version, dh.status, dh.url, dh.notes, dh.reason, dh.date, d.docsuff, d.cat1, d.cat2, d.cat3, d.cat4, d.ownerid, d.title, d.url as 'docurl', d.version as 'docversion', d.status as 'maindocstatus', d.reference, d.draftstamp, d.proofreadstamp, d.reviewstamp, d.approvestamp
    from tbl_document_history dh, tbl_document d
    WHERE dh.accid = zaccid
    and dh.docstatus <> 'done'
    AND dh.docid = d.docid
    ORDER BY dh.docid ASC;
    
END$$

CREATE PROCEDURE `fetchDocumentHistoryByOwnerId` (IN `zownerid` VARCHAR(50))  BEGIN
    SELECT dh.id, dh.docid, dh.accid, dh.role, dh.docstatus, dh.version, dh.status, dh.url, dh.notes, dh.reason, dh.date, d.docsuff, d.cat1, d.cat2, d.cat3, d.cat4, d.ownerid, d.title, d.url as 'docurl', d.version as 'docversion', d.status as 'maindocstatus', d.reference, d.draftstamp, d.proofreadstamp, d.reviewstamp, d.approvestamp, d.execution, d.projectid, d.comid, d.effective
    FROM tbl_document_history dh, tbl_document d 
    WHERE d.ownerid = zownerid 
    AND d.docid = dh.docid;
END$$

CREATE PROCEDURE `fetchDocumentHistoryStatus` (IN `zdocid` VARCHAR(50), IN `zaccid` VARCHAR(50), IN `zrole` VARCHAR(50))  BEGIN
    SELECT `status` FROM tbl_document_history WHERE docid = zdocid AND accid = zaccid AND role = zrole;
END$$

CREATE PROCEDURE `fetchDocumentMappingByAccountId` (IN `zaccid` VARCHAR(50))  BEGIN
    SELECT dm.planid as 'planid', pc.title as 'title'
    FROM tbl_document_mapping dm, tbl_planning_connect pc
    WHERE dm.accid = zaccid
    AND dm.docid IS NULL
    AND dm.planid = pc.docid;
END$$

CREATE PROCEDURE `fetchDocumentScheduleConnectedToProject` (IN `zprojectid` VARCHAR(30))  BEGIN

SELECT 
pc.docid AS planningid, pc.title AS planningtitle,
pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, pd.mapid AS actualid, 
plink.linkid,plink.stage AS linkstage,
pp.producessorid, pp.stage AS producessorstage
FROM ((((tbl_planning_connect AS pc)
INNER JOIN tbl_planning_document AS pd ON pd.docid = pc.docid)
LEFT OUTER JOIN tbl_planning_document_link AS plink ON plink.docid = pd.docid)
LEFT OUTER JOIN tbl_planning_document_producessor AS pp ON pp.docid = pd.docid)
WHERE pc.projectid = zprojectid;

END$$

CREATE PROCEDURE `fetchDocumentsConnectedToProjectUpdated` (IN `zprojectid` VARCHAR(30))  BEGIN
SELECT 
pc.docid AS planningid, pc.title AS planningtitle,
pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, pd.mapid AS actualid, 
plink.linkid,plink.stage AS linkstage,
pprod.producessorid, pprod.stage AS producessorstage,
d.title AS actualtitle, d.ownerid, d.status, d.draftstamp, d.proofreadstamp, d.reviewstamp, d.approvestamp, d.postapprovestamp
FROM (((((tbl_planning_connect AS pc)
INNER JOIN tbl_planning_document AS pd ON pd.docid = pc.docid)
LEFT OUTER JOIN tbl_planning_document_link AS plink ON plink.docid = pd.docid)
LEFT OUTER JOIN tbl_planning_document_producessor AS pprod ON pprod.docid = pd.docid)
LEFT OUTER JOIN tbl_document AS d ON pd.mapid = d.docid)
WHERE pc.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchGroupById` (IN `zmemberid` VARCHAR(50))  BEGIN
   select g.groupname as 'groupname', g.groupid as 'groupid', g.owner as 'owner', a.firstname as 'firstname', a.lastname as 'lastname', a.photo as 'photo' from tbl_group_member gm INNER JOIN tbl_group g ON gm.groupid = g.groupid INNER JOIN tbl_account a ON g.owner = a.id WHERE gm.memberid = zmemberid;
END$$

CREATE PROCEDURE `fetchGroupInfo` (IN `zgroupid` VARCHAR(50))  BEGIN
    SELECT g.groupid as 'id', g.groupname as 'groupname', a.id as 'ownerid', a.firstname as 'firstname', a.lastname as 'lastname', a.photo as 'photo'
    FROM tbl_group g, tbl_account a
    WHERE g.owner = a.id
    AND g.groupid = zgroupid;
END$$

CREATE PROCEDURE `fetchGroupMembers` (IN `zgroupid` VARCHAR(50))  BEGIN
    select DISTINCT a.firstname as 'firstname', a.lastname as 'lastname', a.photo as 'photo', a.id as 'id' from tbl_account a, tbl_group_member gm 
    where gm.groupid = zgroupid
    and gm.memberid = a.id;
END$$

CREATE PROCEDURE `fetchMinutesByOwnerId` (IN `zprojectid` VARCHAR(50), IN `zownerid` VARCHAR(50))  BEGIN
    SELECT pm.id, pm.partid, `date`, `time`, pm.subject, pm.type, `mode`, pm.location, pm.attendees, pm.responsible, pm.respotype, pm.respohours, pm.due, pm.description, pm.ownerid, (SELECT pmd.id FROM tbl_project_minutes_dist AS pmd WHERE pmd.projectid=zprojectid AND pmd.partid = pm.partid)  AS dmid
    FROM tbl_project_minutes AS pm
    WHERE projectid = zprojectid
    AND ownerid = zownerid;
END$$

CREATE PROCEDURE `fetchMinutesByProjectId` (IN `zprojectid` VARCHAR(50), IN `zpartid` VARCHAR(50))  NO SQL
BEGIN
    SELECT pm.id, pm.partid, `date`, `time`, pm.subject, pm.type, `mode`, pm.location, pm.attendees, pm.responsible, pm.respotype, pm.respohours, pm.due, pm.description, pm.ownerid, (SELECT pmd.id FROM tbl_project_minutes_dist AS pmd WHERE pmd.projectid=zprojectid AND pmd.partid = pm.partid)  AS dmid
    FROM tbl_project_minutes AS pm
    WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchPlanningDocumentByDocName` (IN `zdocname` TINYTEXT)  BEGIN
SELECT title, docid FROM tbl_planning_connect WHERE title = zdocname;
END$$

CREATE PROCEDURE `fetchPlanningDocumentLink` (IN `zdocid` VARCHAR(30))  BEGIN
(SELECT linkid, docid, stage FROM tbl_planning_document_link WHERE docid = zdocid) UNION (SELECT linkid, docid, stage FROM tbl_planning_document_link);
END$$

CREATE PROCEDURE `fetchPlanningDocumentProducessor` (IN `zdocid` VARCHAR(30), IN `zpredid` VARCHAR(30))  READS SQL DATA
BEGIN
SELECT pd.producessorid, pd.docid, pd.preddocid, pd.stage , pd.prevdate
FROM tbl_planning_document_producessor AS pd 
WHERE pd.docid = zdocid and pd.producessorid = zpredid;
END$$

CREATE PROCEDURE `fetchPlanningDocuments` (IN `zprojectid` VARCHAR(30))  READS SQL DATA
BEGIN
SELECT DISTINCT
pd.docid AS planningid, pd.projectid, pd.title AS planningtitle,
pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, pd.mapid, pd.milestone,
plink.linkid,plink.stage AS linkstage,
pprod.producessorid, pprod.stage AS producessorstage
FROM (((tbl_planning_document AS pd)
LEFT OUTER JOIN tbl_planning_document_link AS plink ON plink.docid = pd.docid)
LEFT OUTER JOIN tbl_planning_document_producessor AS pprod ON pprod.docid = pd.docid)
WHERE pd.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchPlanningDocumentsByProjectId` (IN `zprojectid` VARCHAR(30))  READS SQL DATA
BEGIN
SELECT pc.projectid, pd.docid, pc.title, pc.mapid, pd.milestone, pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled from tbl_planning_document AS pd 
INNER JOIN tbl_planning_connect AS pc  ON pd.docid = pc.docid 
where pc.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchPlanningScheduleByDocId` (IN `zdocid` VARCHAR(30))  BEGIN
SELECT * FROM tbl_planning_document WHERE docid = zdocid;
END$$

CREATE PROCEDURE `fetchPlanningScheduleByProjectId` (IN `zprojectid` VARCHAR(30))  BEGIN
SELECT 
pc.docid AS planningid, pc.projectid, pc.title AS planningtitle,
pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, pd.mapid AS actualid, pd.milestone,
plink.linkid,plink.stage AS linkstage,
pprod.producessorid, pprod.stage AS producessorstage,
d.title AS actualtitle
FROM (((((tbl_planning_connect AS pc)
INNER JOIN tbl_planning_document AS pd ON pd.docid = pc.docid)
LEFT OUTER JOIN tbl_planning_document_link AS plink ON plink.docid = pd.docid)
LEFT OUTER JOIN tbl_planning_document_producessor AS pprod ON pprod.docid = pd.docid)
LEFT OUTER JOIN tbl_document AS d ON pd.mapid = d.docid)
WHERE pc.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchPlanningSchedules` (IN `zprojectid` VARCHAR(30))  READS SQL DATA
BEGIN
SELECT 
pc.docid AS planningid, pc.projectid, pc.title AS planningtitle,
pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, pd.milestone,
plink.linkid,plink.stage AS linkstage,
pprod.producessorid, pprod.stage AS producessorstage
FROM (((tbl_planning_connect AS pc)
INNER JOIN tbl_planning_document AS pd ON pd.docid = pc.docid)
LEFT OUTER JOIN tbl_planning_document_link AS plink ON plink.docid = pd.docid)
LEFT OUTER JOIN tbl_planning_document_producessor AS pprod ON pprod.docid = pd.docid
WHERE pc.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchPlanningTasksByDocid` (IN `zdocid` VARCHAR(15))  BEGIN
SELECT * FROM tbl_planning_document_task WHERE docid = zdocid;
END$$

CREATE PROCEDURE `fetchPlanningTestSchedule` (IN `zownerid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_planning_schedule WHERE ownerid = zownerid;
END$$

CREATE PROCEDURE `fetchPositionByDepartment` (IN `zcomid` VARCHAR(50), IN `zdept` VARCHAR(50))  BEGIN
    select id, title from tbl_position where companyid = zcomid and department = zdept;
END$$

CREATE PROCEDURE `fetchPositions` (IN `zcomid` VARCHAR(50))  BEGIN
    select id, title, department from tbl_position where companyid = zcomid;
END$$

CREATE PROCEDURE `fetchProjectbyCompanyId` (IN `zcompanyid` VARCHAR(50))  BEGIN
	SELECT p.*, a.firstname as 'firstname', a.lastname as 'lastname', a.photo as 'photo' FROM tbl_project p, tbl_account a WHERE companyid = zcompanyid AND p.owner = a.id;
END$$

CREATE PROCEDURE `fetchProjectByConnect` (IN `zid` VARCHAR(50))  BEGIN
    SELECT p.projectid as 'projectid', p.projectname as 'projectname', p.owner as 'owner', a.firstname as 'firstname', a.lastname as 'lastname', a.photo as 'photo'
    FROM tbl_project p, tbl_project_connect pc, tbl_account a
    WHERE pc.projectid = p.projectid 
    AND p.owner = a.id
    AND pc.id = zid;
END$$

CREATE PROCEDURE `fetchProjectConnectByProjectId` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT DISTINCT pc.id as 'id', a.firstname as 'firstname', a.lastname as 'lastname', a.photo as 'photo'
    FROM tbl_project_connect pc, tbl_account a 
    WHERE pc.id = a.id
    AND pc.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchProjectDocuments` (IN `zprojid` VARCHAR(50))  BEGIN
    select pc.docid, pc.title from tbl_planning_connect as pc where pc.projectid = zprojid;
END$$

CREATE PROCEDURE `fetchProjectInfo` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT * from tbl_project_info WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchProjectInfoColumn` (IN `zprojectid` VARCHAR(50), IN `zcolumnname` VARCHAR(50))  BEGIN
    SET @s = CONCAT( "SELECT ", zcolumnname , " FROM tbl_project_info WHERE projectid = '", zprojectid, "'; ");
    PREPARE stmt FROM @s;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE `fetchProjectProduct` (IN `zprojectid` VARCHAR(50))  BEGIN
    select productid, productname from tbl_project_product where projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchProjectRegisterByOwnerId` (IN `zprojectid` VARCHAR(50), IN `zownerid` VARCHAR(50))  BEGIN
    SELECT id, projectid, `date`, `time`, subject, type, `mode`, impact, impdescription, description, ownerid
    FROM tbl_project_register  AS pr
    WHERE pr.projectid = zprojectid
    AND pr.ownerid = zownerid;
END$$

CREATE PROCEDURE `fetchProjectRequestByProjectid` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_project_request WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchProjectRequestTechnical` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_project_request_technical WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchProjectsByAllConnect` (IN `zaccid` VARCHAR(30))  BEGIN
SELECT DISTINCT
p.projectid, p.projectname, pc.id
FROM tbl_project_connect AS pc
INNER JOIN tbl_project AS p
ON pc.projectid = p.projectid
WHERE pc.id = zaccid OR p.owner = zaccid OR pc.id IN (SELECT 
groupid
FROM tbl_group_member AS gm
WHERE gm.memberid = zaccid);
END$$

CREATE PROCEDURE `fetchProjectsByOwner` (IN `zowner` VARCHAR(50))  BEGIN
    select * from tbl_project where owner = zowner;
END$$

CREATE PROCEDURE `fetchProjectsByProjectId` (IN `zprojectid` VARCHAR(50))  BEGIN
    select projectname from tbl_project where projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchProjectsBySuperiorId` (IN `zid` VARCHAR(30))  READS SQL DATA
BEGIN
    SELECT DISTINCT * FROM tbl_project as p where p.owner = zid 
    or creator = zid 
    or p.owner IN (select acs.accid from tbl_account_supervisor as acs where acs.superid = zid) 
    or p.projectid in (select pc.projectid from tbl_project_connect as pc where pc.id = zid);
END$$

CREATE PROCEDURE `fetchProjectTimesheetByProjectid` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_project_timesheet WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchRequestTechAddByProjectId` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_project_request_technical_add WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchSkid` (IN `zcomid` VARCHAR(30))  BEGIN
    SELECT * from tbl_skid WHERE comid = zcomid;
END$$

CREATE PROCEDURE `fetchSkidOperation` (IN `zcomid` VARCHAR(50))  BEGIN
    SELECT * from tbl_skid_operations WHERE comid = zcomid;
END$$

CREATE PROCEDURE `fetchSkidProject` (IN `zid` VARCHAR(30))  BEGIN
    SELECT * from tbl_project WHERE id = zid;
END$$

CREATE PROCEDURE `fetchSkidSubOperation` (IN `zcomid` VARCHAR(50))  BEGIN
    SELECT * from tbl_skid_suboperations WHERE comid = zcomid;
END$$

CREATE PROCEDURE `fetchSupplierByCompanyId` (IN `zcompanyid` VARCHAR(50))  BEGIN
    SELECT supplierid, projectid, name FROM tbl_supplier WHERE companyid = zcompanyid;
END$$

CREATE PROCEDURE `fetchSupplierByProjectResource` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT DISTINCT s.name as 'suppliername', s.supplierid as 'supplierid', tr.type 
    FROM tbl_supplier s, tbl_task_resource tr 
    WHERE tr.supplierid = s.supplierid 
    AND tr.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchSupplierRateByProjectid` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_supplier_rate WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchTaskByProjectid` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_task WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchTaskResourceByPlanId` (IN `zplanid` VARCHAR(50))  BEGIN
    SELECT DISTINCT tr.*, IFNULL(a.firstname,'') as 'firstname', IFNULL(a.lastname,'') as 'lastname', IFNULL(s.name,'') as 'suppliername' FROM tbl_task_resource tr
	LEFT JOIN tbl_account a 
    	ON tr.accid = a.id
    LEFT JOIN tbl_supplier s
    	ON tr.supplierid = s.supplierid
    WHERE tr.planid = zplanid;
END$$

CREATE PROCEDURE `fetchTaskResourceByPlanIdUpdated` (IN `zplanid` VARCHAR(30))  READS SQL DATA
BEGIN

    SELECT DISTINCT tr.*, IFNULL(a.firstname,'') as 'firstname', IFNULL(a.lastname,'') as 'lastname', IFNULL(s.name,'') as 'suppliername', t.taskname, t.startdate, t.enddate FROM tbl_task as t
    LEFT JOIN tbl_task_resource tr
    	ON t.taskid = tr.id
	LEFT JOIN tbl_account a 
    	ON tr.accid = a.id
    LEFT JOIN tbl_supplier s
    	ON tr.supplierid = s.supplierid
    WHERE t.planid = zplanid;

END$$

CREATE PROCEDURE `fetchTaskResourceByProjectId` (IN `zprojectid` VARCHAR(50))  BEGIN
    SELECT DISTINCT tr.*, IFNULL(a.firstname,'') as 'firstname', IFNULL(a.lastname,'') as 'lastname', IFNULL(s.name,'') as 'suppliername' FROM tbl_task_resource tr
	LEFT JOIN tbl_account a 
    	ON tr.accid = a.id
    LEFT JOIN tbl_supplier s
    	ON tr.supplierid = s.supplierid
    WHERE tr.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchTaskResourcesByPlanidProjid` (IN `zplanid` VARCHAR(30), IN `zprojid` VARCHAR(30))  BEGIN
    SELECT DISTINCT tr.*, IFNULL(a.firstname,'') as 'firstname', IFNULL(a.lastname,'') as 'lastname', IFNULL(s.name,'') as 'suppliername' FROM tbl_task_resource tr
	LEFT JOIN tbl_account a 
    	ON tr.accid = a.id
    LEFT JOIN tbl_supplier s
    	ON tr.supplierid = s.supplierid
    WHERE tr.planid = zplanid AND tr.projectid = zprojid;
END$$

CREATE PROCEDURE `fetchTmpAccounts` (IN `zprojectid` VARCHAR(50))  READS SQL DATA
BEGIN 
	SELECT * FROM tbl_account_tmp AS d WHERE d.projectid = zprojectid;
END$$

CREATE PROCEDURE `fetchTmpSuppliers` (IN `zprojectid` VARCHAR(50))  READS SQL DATA
BEGIN
	SELECT * FROM tbl_supplier_tmp AS s WHERE s.projectid = zprojectid;
END$$

CREATE PROCEDURE `getAccountInfo` (IN `zid` VARCHAR(50))  BEGIN
    select a.id, a.companyid, a.email, a.password, a.userlevel, a.lastname, a.firstname, a.phone, a.birthdate, a.position, a.department, a.photo, acs.superid 
FROM tbl_account a, tbl_account_supervisor acs 
where acs.accid = a.id
AND a.id = zid;
END$$

CREATE PROCEDURE `getDocumentBankCategoryCount` (IN `zcat1` VARCHAR(50), IN `zcat2` VARCHAR(50), IN `zcat3` VARCHAR(50), IN `zcat4` VARCHAR(50))  BEGIN
    SELECT COUNT(docid) as 'found' from tbl_document_bank WHERE cat1 = zcat1 AND cat2 = zcat2 AND cat3 = zcat3 AND cat4 = zcat4;
END$$

CREATE PROCEDURE `getDocumentCountByCategory` (IN `zcat1` INT(10), IN `zcat2` INT(10), IN `zcat3` INT(10), IN `zcat4` INT(10))  BEGIN
    SELECT COUNT(docid) as 'found' FROM tbl_document WHERE cat1 = zcat1 AND cat2 = zcat2 AND cat3 = zcat3 AND cat4 = zcat4;
END$$

CREATE PROCEDURE `getDocumentStatus` (IN `zdocid` VARCHAR(50))  BEGIN
    SELECT * FROM tbl_document WHERE docid = zdocid;
END$$

CREATE PROCEDURE `login` (IN `zid` VARCHAR(50), IN `zemail` VARCHAR(50), IN `zpassword` VARCHAR(50), IN `zcompanyid` VARCHAR(50))  BEGIN
    select userlevel, firstname, photo from tbl_account where id = zid and password = zpassword and email = zemail and companyid = zcompanyid;
END$$

CREATE PROCEDURE `machineTest` (IN `zmachineid` VARCHAR(50), IN `zaccid` VARCHAR(50))  BEGIN
IF ( (SELECT COUNT(machineid) FROM tbl_account_machine WHERE machineid = zmachineid) > 0 ) THEN
    BEGIN
    	 UPDATE tbl_account_machine SET accid = zaccid WHERE machineid = zmachineid ;
    END;
    ELSE 
    BEGIN
    	INSERT INTO tbl_account_machine (machineid, accid) VALUES (zmachineid, zaccid);
    END;
END IF;
    
END$$

CREATE PROCEDURE `mapTmpAccounts` (IN `tmpaccid` VARCHAR(50), IN `newaccid` VARCHAR(50), IN `accrateid` VARCHAR(50), IN `zprojectid` VARCHAR(50), IN `accroleid` VARCHAR(50), IN `zname` VARCHAR(50))  MODIFIES SQL DATA
BEGIN
	
            IF EXISTS (SELECT accid FROM tbl_account_rate 
                       WHERE (accid = tmpaccid OR accid = newaccid)
                       AND projectid = 	zprojectid) THEN
                BEGIN
                    UPDATE tbl_account_rate
                    SET accid = newaccid
                    WHERE accid = tmpaccid AND projectid = zprojectid;
                END;
            ELSE
                BEGIN
                    INSERT INTO tbl_account_rate (id,accid,projectid,rate)
                    SELECT accrateid,newaccid,zprojectid,rate
                    FROM tbl_account_tmp
                    WHERE id = tmpaccid;
                END;
            END IF;
    
	INSERT INTO tbl_account_role (id,accid,projectid,role)
	SELECT accroleid,newaccid,zprojectid,role
	FROM tbl_account_tmp
	WHERE id = tmpaccid;
    
    UPDATE tbl_task_resource
    SET accid = newaccid, mapaccid = tmpaccid
    WHERE accid = tmpaccid;

    UPDATE tbl_account_tmp
    SET mapaccid = newaccid, name = zname
    WHERE id = tmpaccid;

    UPDATE tbl_project_budget_forecast
    SET mapaccid = newaccid
    WHERE resourceid = tmpaccid;
END$$

CREATE PROCEDURE `mapTmpSupplier` (IN `tmpsupid` VARCHAR(50), IN `newsupid` VARCHAR(50), IN `newsuprateid` VARCHAR(50), IN `newsupname` VARCHAR(200), IN `zrate` VARCHAR(50), IN `ztype` VARCHAR(50), IN `zprojectid` VARCHAR(50))  MODIFIES SQL DATA
BEGIN
	IF EXISTS (SELECT supplierid FROM tbl_supplier_rate 
        WHERE (supplierid = tmpsupid OR supplierid = newsupid) AND projectid = zprojectid) THEN
        BEGIN
            UPDATE tbl_supplier_rate
            SET rate = zrate, supplierid = newsupid
            WHERE supplierid = tmpsupid AND projectid = zprojectid;
        END;
    ELSE
        BEGIN
            INSERT INTO tbl_supplier_rate(id,supplierid,projectid,type,rate)
			SELECT newsuprateid,newsupid,projectid,ztype,zrate
			FROM tbl_supplier_tmp
			WHERE id = tmpsupid;
        END;
    END IF;

	UPDATE tbl_task_resource
	SET supplierid = newsupid
	WHERE supplierid = tmpsupid;
	
	UPDATE tbl_project_budget
    SET vendor = newsupid
    WHERE vendor = tmpsupid;

    UPDATE tbl_project_budget_forecast
    SET resourceid = newsupid
    WHERE resourceid = tmpsupid;
	
	UPDATE tbl_supplier_tmp
    SET mapsupid = newsupid, name = newsupname
    WHERE id = tmpsupid;

END$$

CREATE PROCEDURE `prelogin` (IN `zid` VARCHAR(50))  BEGIN
    select name, logo from tbl_company where companyid = zid;
END$$

CREATE PROCEDURE `removeDocumentCategory` (IN `zid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_document_category WHERE id = zid;
END$$

CREATE PROCEDURE `removeGroupMember` (IN `zgroupid` VARCHAR(50), IN `zmemberid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_group_member where groupid = zgroupid and memberid = zmemberid;
END$$

CREATE PROCEDURE `removeProjectConnect` (IN `zid` VARCHAR(50), IN `zprojectid` VARCHAR(50))  BEGIN
    DELETE FROM tbl_project_connect WHERE id = zid and projectid = zprojectid;
END$$

CREATE PROCEDURE `searchAccountByName` (IN `zname` VARCHAR(50))  BEGIN
    SELECT firstname, lastname, id, photo from tbl_account WHERE firstname LIKE CONCAT('%', zname , '%') OR lastname LIKE CONCAT('%', zname , '%');
END$$

CREATE PROCEDURE `searchDepartment` (IN `zcomid` VARCHAR(50), IN `ztitle` VARCHAR(50))  BEGIN
    SELECT id, title FROM tbl_department where companyid = zcomid and title LIKE CONCAT('%', ztitle , '%');
END$$

CREATE PROCEDURE `searchPlanningDocument` (IN `zsearch` VARCHAR(50))  BEGIN
    SELECT docid, projectid, title, mapid FROM tbl_planning_connect WHERE docid LIKE CONCAT('%', zsearch , '%') OR title LIKE CONCAT('%', zsearch , '%');
END$$

CREATE PROCEDURE `searchPosition` (IN `zcomid` VARCHAR(50), IN `ztitle` VARCHAR(50))  BEGIN
    SELECT id, title FROM tbl_position where companyid = zcomid and title LIKE CONCAT('%', ztitle , '%');
END$$

CREATE PROCEDURE `searchPositionByDepartment` (IN `zcomid` VARCHAR(50), IN `ztitle` VARCHAR(50), IN `zdept` VARCHAR(50))  BEGIN
    SELECT id, title FROM tbl_position where companyid = zcomid and department = zdept and title LIKE CONCAT('%', ztitle , '%');
END$$

CREATE PROCEDURE `updateAccount` (IN `zid` VARCHAR(50), IN `zemail` VARCHAR(50), IN `zuserlevel` VARCHAR(50), IN `zlastname` VARCHAR(50), IN `zfirstname` VARCHAR(50), IN `zphone` VARCHAR(50), IN `zbirthdate` VARCHAR(50), IN `zposition` VARCHAR(50), IN `zdepartment` VARCHAR(50), IN `zsuperid` VARCHAR(50))  BEGIN
    IF ((SELECT count(*) from tbl_account_supervisor 
         WHERE accid = zid) = 0) THEN
        BEGIN
            INSERT INTO tbl_account_supervisor (accid, superid)
            values(zid, zsuperid);
        END;
    ELSE
    	BEGIN
        	UPDATE tbl_account_supervisor 
            SET superid = zsuperid
            WHERE accid = zid;
        END;
        end if;
END$$

CREATE PROCEDURE `updateAccountRate` (IN `zid` VARCHAR(50), IN `zrate` VARCHAR(50))  BEGIN
    UPDATE tbl_account_rate SET rate = zrate WHERE id = zid;
END$$

CREATE PROCEDURE `updateDepartment` (IN `zid` VARCHAR(50), IN `ztitle` VARCHAR(50))  BEGIN
    UPDATE tbl_department set title = ztitle where id = zid;
END$$

CREATE PROCEDURE `updateDocidToEffectiveId` (IN `oldid` VARCHAR(50), IN `newid` VARCHAR(50), IN `zversion` VARCHAR(50))  BEGIN
    UPDATE tbl_document_connect SET docid = newid WHERE docid = oldid;
    UPDATE tbl_document_history SET docid = newid WHERE docid = oldid;
    UPDATE tbl_document SET docid = newid, effective = newid, version = zversion WHERE docid = oldid;
END$$

CREATE PROCEDURE `updateDocumentCategory` (IN `zdocid` VARCHAR(50), IN `zcat1` INT(10), IN `zcat2` INT(10), IN `zcat3` INT(10), IN `zcat4` INT(10))  BEGIN
    UPDATE `tbl_document` SET cat1 = zcat1, cat2 = zcat2, cat3 = zcat3, cat4 = zcat4 WHERE docid = zdocid;
END$$

CREATE PROCEDURE `updateDocumentCategoryName` (IN `zid` VARCHAR(50), IN `zname` VARCHAR(50))  BEGIN
    UPDATE tbl_document_category SET name = zname where id = zid;
END$$

CREATE PROCEDURE `updateDocumentColumn` (IN `zdocid` VARCHAR(50), IN `zcolumnname` VARCHAR(50), IN `zvalue` VARCHAR(50))  BEGIN
    SET @s = CONCAT( "UPDATE tbl_document SET `", zcolumnname ,"` = '", zvalue ,"' WHERE docid = '", zdocid ,"'; ");
    PREPARE stmt FROM @s;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE `updateDocumentHistory` (IN `zdocid` VARCHAR(50), IN `zaccid` VARCHAR(50), IN `zversion` VARCHAR(50), IN `zurl` VARCHAR(100), IN `znotes` VARCHAR(50), IN `zrole` VARCHAR(50))  BEGIN
    UPDATE tbl_document_history SET url = zurl, notes = znotes, version = zversion WHERE docid = zdocid AND accid = zaccid AND role = zrole;
END$$

CREATE PROCEDURE `updateDocumentHistoryStatus` (IN `zdocid` VARCHAR(30), IN `zaccid` VARCHAR(30), IN `zversion` VARCHAR(30), IN `zstatus` VARCHAR(30), IN `zreason` VARCHAR(500), IN `zdate` VARCHAR(30), IN `zrole` VARCHAR(30))  BEGIN
    UPDATE tbl_document_history SET `status` = zstatus, reason = zreason, `date` = zdate 
    WHERE docid = zdocid 
    AND accid = zaccid 
    AND version = zversion
    AND role = zrole;
END$$

CREATE PROCEDURE `updateDocumentMapping` (IN `zdocid` VARCHAR(50), IN `zplanid` VARCHAR(50))  BEGIN
    UPDATE tbl_document SET mapid = zplanid WHERE docid = zdocid;
    UPDATE tbl_planning_document SET mapid = zdocid WHERE docid = zplanid;
END$$

CREATE PROCEDURE `updateDocumentSendToExecution` (IN `zdocid` VARCHAR(50), IN `zversion` VARCHAR(50))  BEGIN
	UPDATE tbl_document SET version = zversion, execution = CURDATE(), `status` = 'proofread', effective = NULL, draftstamp = CURDATE(), proofreadstamp = NULL, reviewstamp = NULL, approvestamp = NULL WHERE docid = zdocid; 
    UPDATE tbl_document_history set docstatus = 'inactive', version = 'na', status = 'na', url = 'na', notes = 'na', reason = 'na', date = '0000-00-00' WHERE docid = zdocid;
	UPDATE tbl_document_history set docstatus = 'proofread' WHERE docid = zdocid and role = 'proofread';
END$$

CREATE PROCEDURE `updateDocumentStatus` (IN `zdocid` VARCHAR(50), IN `zstatus` VARCHAR(50))  BEGIN

UPDATE tbl_document_history SET docstatus = 'done' 
WHERE docid = zdocid 
AND docstatus = zstatus;


IF(STRCMP(zstatus, 'draft') = 0) THEN
    UPDATE tbl_document_history SET `docstatus` = 'proofread'
    WHERE docid = zdocid and role = 'proofread';
    UPDATE tbl_document SET `draftstamp` = curdate(),
    `status` = 'proofread'
    WHERE docid = zdocid;
ELSEIF(STRCMP(zstatus, 'proofread') = 0) THEN
    UPDATE tbl_document_history SET `docstatus` = 'review'
    WHERE docid = zdocid and role = 'review';
    UPDATE tbl_document SET `proofreadstamp` = curdate(),
    `status` = 'review'
    WHERE docid = zdocid;
ELSEIF(STRCMP(zstatus, 'review') = 0) THEN
    UPDATE tbl_document_history SET `docstatus` = 'approve' 
    WHERE docid = zdocid and role = 'approve';
    UPDATE tbl_document SET `reviewstamp` = curdate(),
    `status` = 'approve'
    WHERE docid = zdocid;
ELSEIF(STRCMP(zstatus, 'approve') = 0) THEN
	UPDATE tbl_document_history SET `docstatus` = 'postapprove' 
    WHERE docid = zdocid and role = 'postapprove';
    UPDATE tbl_document SET `approvestamp` = curdate(),
    `status` = 'ok'
    WHERE docid = zdocid;
ELSEIF(STRCMP(zstatus, 'postapprove') = 0) THEN
    UPDATE tbl_document SET `postapprovestamp` = curdate(),
    `status` = 'v2'
    WHERE docid = zdocid;
END IF;
    
END$$

CREATE PROCEDURE `updateMilestone` (IN `zdocid` VARCHAR(30))  BEGIN
        UPDATE tbl_planning_document
		SET milestone = 'true'
    	WHERE docid = zdocid;
    END$$

CREATE PROCEDURE `updatePlanningConnect` (IN `zdocid` VARCHAR(30), IN `zprojectid` VARCHAR(30), IN `ztitle` VARCHAR(30))  BEGIN
UPDATE tbl_planning_connect
SET projectid = zprojectid
WHERE docid=zdocid AND title = ztitle;
END$$

CREATE PROCEDURE `updatePlanningConnectMap` (IN `zdocid` VARCHAR(50), IN `zmapid` VARCHAR(50))  BEGIN
    UPDATE tbl_planning_connect SET mapid = zmapid WHERE docid = zdocid;
    INSERT INTO tbl_document_mapping(planid, accid, docid) values(zdocid, zmapid, DEFAULT);
END$$

CREATE PROCEDURE `updatePlanningDocumentLinks` (IN `zlinkid` VARCHAR(30), IN `zstage` VARCHAR(30), IN `zdocid` VARCHAR(30), IN `zlinkstatus` VARCHAR(30))  BEGIN
IF (zlinkstatus = 'add') THEN
    BEGIN
        INSERT INTO tbl_planning_document_link (linkid, docid, stage) VALUES (zlinkid, zdocid, zstage);
    END;
    
    ELSEIF (zlinkstatus = 'delete') THEN
	BEGIN
    	DELETE FROM tbl_planning_document_link WHERE linkid = zlinkid AND docid = zdocid;
    END;
    
END IF;

END$$

CREATE PROCEDURE `updatePlanningDocumentProducessor` (IN `zproducessorid` VARCHAR(30), IN `zdocid` VARCHAR(30), IN `zproducessorstage` VARCHAR(30), IN `zproducessorstatus` VARCHAR(30), IN `zpreddocid` VARCHAR(30))  BEGIN
IF (zproducessorstatus = 'add') THEN
    BEGIN
        INSERT INTO tbl_planning_document_producessor (producessorid, docid, preddocid, stage) VALUES (zproducessorid, zdocid, zpreddocid, zproducessorstage);
    END;
    
    ELSEIF (zproducessorstatus = 'delete') THEN
	BEGIN
    	DELETE FROM tbl_planning_document_producessor WHERE producessorid = zproducessorid AND docid = zdocid AND preddocid = zpreddocid;
    END;
    
END IF;

END$$

CREATE PROCEDURE `updatePlanningDocumentTask` (IN `ztaskid` VARCHAR(30), IN `zdocid` VARCHAR(30), IN `ztaskname` VARCHAR(30), IN `zstartdate` DATE, IN `zenddate` DATE)  BEGIN
UPDATE tbl_planning_document_task
SET taskname = ztaskname, startdate = zstartdate, enddate = zenddate
WHERE docid = zdocid AND taskid = ztaskid;
END$$

CREATE PROCEDURE `updatePlanningScheduleByDocId` (IN `zdocid` VARCHAR(30), IN `zdraftsd` VARCHAR(30), IN `zdrafted` VARCHAR(30), IN `zreviewed` VARCHAR(30), IN `zapprovaled` VARCHAR(30), IN `zexecutioned` VARCHAR(30), IN `zpostapprovaled` VARCHAR(30), IN `zlinkid` VARCHAR(30), IN `zlinkstage` VARCHAR(30), IN `zproducessorid` VARCHAR(30), IN `zproducessorstage` VARCHAR(30))  BEGIN
UPDATE tbl_planning_document
SET draftsd = zdraftsd, drafted = zdrafted, reviewed = zreviewed, approvaled = zapprovaled, executioned = zexecutioned, postapprovaled = zpostapprovaled
WHERE docid = zdocid;

IF (zlinkid = 'undefined') THEN
    BEGIN
        UPDATE tbl_planning_document
		SET linkid = null, linkstage = null
    	WHERE docid = zdocid;
    END;
END IF;
    

IF (zproducessorid = 'undefined') THEN
	BEGIN
    	UPDATE tbl_planning_document
    	SET producessorid = null, producessorstage = null
    	WHERE docid = zdocid;
    END;
    
END IF;

END$$

CREATE PROCEDURE `updatePMComment` (IN `ztaskid` VARCHAR(50), IN `zmessage` VARCHAR(50))  BEGIN
    UPDATE tbl_task_resource SET pmcomment = zmessage, pmread = 'unread' WHERE taskid = ztaskid;
END$$

CREATE PROCEDURE `updatePosition` (IN `zid` VARCHAR(50), IN `ztitle` VARCHAR(50))  BEGIN
    UPDATE tbl_position set title = ztitle where id = zid;
END$$

CREATE PROCEDURE `updatePositionDepartment` (IN `zid` VARCHAR(50), IN `zdept` VARCHAR(50))  BEGIN
    UPDATE tbl_position SET department = zdept WHERE id = zid;
END$$

CREATE PROCEDURE `updateProject` (IN `zprojectid` VARCHAR(50), IN `zprojectname` VARCHAR(50))  BEGIN
    UPDATE tbl_project set projectname = zprojectname where projectid = zprojectid;
END$$

CREATE PROCEDURE `updateProjectInfo` (IN `zprojectid` VARCHAR(50), IN `zcolumnname` VARCHAR(50), IN `zvalue` VARCHAR(50))  BEGIN
    SET @s = CONCAT( 'UPDATE tbl_project_info SET ', zcolumnname, " = '", zvalue , "' WHERE projectid = '", zprojectid, "'" );
    PREPARE stmt FROM @s;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE `updateProjectMinutes` (IN `zid` VARCHAR(50), IN `zdate` VARCHAR(50), IN `ztime` VARCHAR(50), IN `zsubject` VARCHAR(100), IN `ztype` VARCHAR(50), IN `zmode` VARCHAR(50), IN `zlocation` VARCHAR(100), IN `zattendees` VARCHAR(200), IN `zresponsible` VARCHAR(50), IN `zrespotype` VARCHAR(50), IN `zrespohours` VARCHAR(50), IN `zdue` VARCHAR(50), IN `zdescription` VARCHAR(500))  BEGIN
    UPDATE tbl_project_minutes SET
        `date` = zdate,
        `time` = ztime,
        subject = zsubject,
        type = ztype,
        `mode` = zmode,
        location = zlocation,
        attendees = zattendees,
        responsible = zresponsible,
        respotype = zrespotype,
        respohours = zrespohours,
        due = zdue,
        description = zdescription
    WHERE id = zid;
END$$

CREATE PROCEDURE `updateProjectProduct` (IN `zproductid` VARCHAR(50), IN `zproductname` VARCHAR(50))  BEGIN
    UPDATE tbl_project_product set productname = zproductname where productid = zproductid;
END$$

CREATE PROCEDURE `updateProjectRegister` (IN `zid` VARCHAR(50), IN `zdate` VARCHAR(50), IN `ztime` VARCHAR(50), IN `zsubject` VARCHAR(300), IN `ztype` VARCHAR(50), IN `zmode` VARCHAR(50), IN `zimpact` VARCHAR(50), IN `zimpdescription` VARCHAR(500), IN `zdescription` VARCHAR(500))  BEGIN
    UPDATE tbl_project_register SET 
    `date` = zdate,
    `time` = ztime,
    `subject` = zsubject,
    `type` = ztype,
    `mode` = zmode,
    `impact` = zimpact,
    `impdescription` = zimpdescription,
    `description` = zdescription
    WHERE id = zid;
    
END$$

CREATE PROCEDURE `updateProjectRequest` (IN `zrequestid` VARCHAR(50), IN `zname` VARCHAR(200), IN `zscore` VARCHAR(200), IN `zdescription` VARCHAR(500), IN `zlocation1` VARCHAR(200), IN `zlocation2` VARCHAR(200), IN `zrequestor` VARCHAR(50), IN `zrequester` VARCHAR(50), IN `zmanager` VARCHAR(50), IN `zsponsor` VARCHAR(20))  BEGIN
    UPDATE tbl_project_request 
    SET name = zname,
    score = zscore,
    description = zdescription,
    location1 = zlocation1,
    location2 = zlocation2,
    requestor = zrequestor,
    requester = zrequester,
    manager = zmanager,
    sponsor = zsponsor
    WHERE requestid = zrequestid;
END$$

CREATE PROCEDURE `updateProjectRequestConnectStatusByProjectId` (IN `zprojectid` VARCHAR(50), IN `zstatus` VARCHAR(50))  MODIFIES SQL DATA
BEGIN
	UPDATE tbl_project_request_connect SET `status` = zstatus 
    WHERE projectid = zprojectid;
END$$

CREATE PROCEDURE `updateScheduleIdIntoProjectId` (IN `zscheduleid` VARCHAR(50), IN `zprojectid` VARCHAR(50))  BEGIN
    UPDATE tbl_planning_connect set projectid = zprojectid WHERE projectid = zscheduleid;
    DELETE FROM tbl_planning_schedule WHERE scheduleid = zscheduleid;
    UPDATE tbl_task set projectid = zprojectid WHERE projectid = zscheduleid;
    UPDATE tbl_task_resource set projectid = zprojectid WHERE projectid = zscheduleid;
END$$

CREATE PROCEDURE `updateSupplierRate` (IN `zid` VARCHAR(50), IN `zrate` VARCHAR(50))  BEGIN
    UPDATE tbl_supplier_rate SET rate = zrate WHERE id = zid;
END$$

CREATE PROCEDURE `updateTaskColumn` (IN `ztaskid` VARCHAR(50), IN `zcolumnname` VARCHAR(50), IN `zvalue` VARCHAR(100))  BEGIN
    SET @s = CONCAT( "UPDATE tbl_task SET `", zcolumnname , "` = '", zvalue ,"' WHERE taskid = '", ztaskid , "'; ");
    PREPARE stmt FROM @s;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE `updateTaskColumnById` (IN `ztaskid` VARCHAR(50), IN `zcolumnname` VARCHAR(50), IN `zvalue` VARCHAR(200))  BEGIN
    SET @s = CONCAT( "UPDATE tbl_task SET `", zcolumnname ,"` = '", zvalue ,"' WHERE taskid = '", ztaskid ,"'; "); 
    PREPARE stmt FROM @s; EXECUTE stmt; 
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE `updateTaskDates` (IN `ztaskid` VARCHAR(50), IN `zstartdate` VARCHAR(50), IN `zenddate` VARCHAR(50))  BEGIN
    UPDATE tbl_task SET startdate = zstartdate, enddate = zenddate WHERE taskid = ztaskid;
END$$

CREATE PROCEDURE `updateTaskResourceColumn` (IN `zid` VARCHAR(50), IN `zcolumnname` VARCHAR(50), IN `zvalue` VARCHAR(50))  BEGIN
    SET @s = CONCAT( "UPDATE tbl_task_resource SET `", zcolumnname ,"` = '", zvalue ,"' WHERE id = '", zid ,"'; ");
    PREPARE stmt FROM @s;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE `updateTaskResourceColumnById` (IN `zid` VARCHAR(50), IN `zcolumnname` VARCHAR(50), IN `zvalue` VARCHAR(200))  BEGIN
    SET @s = CONCAT( "UPDATE tbl_task_resource SET `", zcolumnname ,"` = '", zvalue ,"' WHERE id = '", zid ,"'; ");
    PREPARE stmt FROM @s;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE `updateTaskResourceColumnByTaskId` (IN `ztaskid` VARCHAR(50), IN `zcolumnname` VARCHAR(50), IN `zvalue` VARCHAR(200))  BEGIN
    SET @s = CONCAT( "UPDATE tbl_task_resource SET `", zcolumnname ,"` = '", zvalue ,"' WHERE taskid = '", ztaskid ,"'; ");
    PREPARE stmt FROM @s;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE `updateTaskResourceColumnByTaskidAndAccid` (IN `ztaskid` VARCHAR(50), IN `zaccid` VARCHAR(50), IN `zcolumnname` VARCHAR(50), IN `zvalue` VARCHAR(50))  BEGIN
    SET @s = CONCAT( "UPDATE tbl_task_resource SET `", zcolumnname , "` = '", zvalue ,"' WHERE taskid = '", ztaskid, "' AND accid = '" , zaccid , "'; ");
    
    PREPARE stmt FROM @s;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_account`
--

CREATE TABLE `tbl_account` (
  `id` varchar(50) NOT NULL,
  `companyid` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `userlevel` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  `position` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `photo` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_account`
--

INSERT INTO `tbl_account` (`id`, `companyid`, `email`, `password`, `userlevel`, `lastname`, `firstname`, `phone`, `birthdate`, `position`, `department`, `photo`) VALUES
('admin', 'admin', 'admin@ceis.com', '5cec175b165e3d5e62c9e13ce848ef6feac81bff', '0', 'Admin', 'Admin', '000-000-0000', '1990-01-01', '', '', 'na');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_account_machine`
--

CREATE TABLE `tbl_account_machine` (
  `machineid` varchar(50) NOT NULL,
  `accid` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_account_module`
--

CREATE TABLE `tbl_account_module` (
  `id` varchar(50) NOT NULL,
  `modulename` varchar(50) NOT NULL,
  `moduleui` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `tbl_account_rate`
--

CREATE TABLE `tbl_account_rate` (
  `id` varchar(50) NOT NULL,
  `accid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `rate` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `tbl_account_role`
--

CREATE TABLE `tbl_account_role` (
  `id` varchar(50) NOT NULL,
  `accid` varchar(50) NOT NULL,
  `tmpaccid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `role` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_account_supervisor`
--

CREATE TABLE `tbl_account_supervisor` (
  `accid` varchar(50) NOT NULL,
  `superid` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_account_tmp`
--

CREATE TABLE `tbl_account_tmp` (
  `id` varchar(50) NOT NULL,
  `mapaccid` varchar(50) DEFAULT NULL,
  `projectid` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rate` float DEFAULT NULL,
  `role` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_alert`
--

CREATE TABLE `tbl_alert` (
  `id` varchar(50) NOT NULL,
  `ownerid` varchar(50) NOT NULL,
  `function` varchar(200) NOT NULL,
  `dataview` varchar(1000) NOT NULL,
  `dataapprove` varchar(1000) NOT NULL,
  `datareject` varchar(1000) NOT NULL,
  `title` varchar(200) NOT NULL,
  `message` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company`
--

CREATE TABLE `tbl_company` (
  `companyid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `language` varchar(50) NOT NULL,
  `timezone` varchar(50) NOT NULL,
  `dateformat` varchar(50) NOT NULL,
  `logo` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company_module`
--

CREATE TABLE `tbl_company_module` (
  `companyid` varchar(50) NOT NULL,
  `modulename` varchar(50) NOT NULL,
  `moduleui` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_department`
--

CREATE TABLE `tbl_department` (
  `id` varchar(50) NOT NULL,
  `companyid` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_document`
--

CREATE TABLE `tbl_document` (
  `docid` varchar(30) NOT NULL,
  `comid` varchar(30) NOT NULL,
  `docsuff` varchar(10) NOT NULL,
  `cat1` int(10) NOT NULL,
  `cat2` int(10) NOT NULL,
  `cat3` int(10) NOT NULL,
  `cat4` int(10) NOT NULL,
  `ownerid` varchar(30) NOT NULL,
  `title` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `version` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `reference` varchar(50) NOT NULL,
  `draftstamp` date NOT NULL,
  `proofreadstamp` date DEFAULT NULL,
  `reviewstamp` date DEFAULT NULL,
  `approvestamp` date DEFAULT NULL,
  `postapprovestamp` date DEFAULT NULL,
  `mapid` varchar(50) DEFAULT NULL,
  `projectid` varchar(30) NOT NULL,
  `execution` varchar(50) DEFAULT NULL,
  `effective` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_document_bank`
--

CREATE TABLE `tbl_document_bank` (
  `docid` varchar(50) NOT NULL,
  `comid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `ownerid` varchar(50) NOT NULL,
  `cat1` int(10) NOT NULL,
  `cat2` int(10) NOT NULL,
  `cat3` int(10) NOT NULL,
  `cat4` int(10) NOT NULL,
  `title` varchar(500) NOT NULL,
  `url` varchar(100) NOT NULL,
  `version` varchar(30) NOT NULL,
  `reference` varchar(100) NOT NULL,
  `stamp` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_document_category`
--

CREATE TABLE `tbl_document_category` (
  `id` varchar(50) NOT NULL,
  `companyid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `ordernum` int(15) NOT NULL,
  `catnum` int(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_document_connect`
--

CREATE TABLE `tbl_document_connect` (
  `accid` varchar(30) NOT NULL,
  `docid` varchar(30) NOT NULL,
  `comid` varchar(30) NOT NULL,
  `role` varchar(30) NOT NULL,
  `read` varchar(10) NOT NULL DEFAULT 'unread'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_document_history`
--

CREATE TABLE `tbl_document_history` (
  `id` varchar(30) NOT NULL,
  `docid` varchar(30) NOT NULL,
  `accid` varchar(30) NOT NULL,
  `role` varchar(30) NOT NULL,
  `docstatus` varchar(30) NOT NULL DEFAULT 'inactive',
  `version` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `url` varchar(100) NOT NULL,
  `notes` varchar(500) NOT NULL,
  `reason` varchar(500) NOT NULL,
  `date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_group`
--

CREATE TABLE `tbl_group` (
  `groupid` varchar(50) NOT NULL,
  `groupname` varchar(50) NOT NULL,
  `owner` varchar(50) NOT NULL,
  `comid` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_group_member`
--

CREATE TABLE `tbl_group_member` (
  `groupid` varchar(50) NOT NULL,
  `memberid` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_planning_document`
--

CREATE TABLE `tbl_planning_document` (
  `docid` varchar(50) NOT NULL DEFAULT '',
  `projectid` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `approvaled` varchar(30) DEFAULT NULL,
  `draftsd` varchar(30) DEFAULT NULL,
  `drafted` varchar(30) DEFAULT NULL,
  `reviewed` varchar(30) DEFAULT NULL,
  `executioned` varchar(30) DEFAULT NULL,
  `postapprovaled` varchar(30) DEFAULT NULL,
  `mapid` varchar(50) DEFAULT NULL,
  `linkid` varchar(30) DEFAULT NULL,
  `producessorid` varchar(30) DEFAULT NULL,
  `milestone` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_planning_document_link`
--

CREATE TABLE `tbl_planning_document_link` (
  `linkid` varchar(30) NOT NULL,
  `docid` varchar(30) NOT NULL,
  `stage` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_planning_document_producessor`
--

CREATE TABLE `tbl_planning_document_producessor` (
  `producessorid` varchar(30) DEFAULT NULL,
  `docid` varchar(30) DEFAULT NULL,
  `preddocid` varchar(30) NOT NULL,
  `stage` varchar(30) DEFAULT NULL,
  `prevdate` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_position`
--

CREATE TABLE `tbl_position` (
  `id` varchar(50) NOT NULL,
  `companyid` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `projectid` varchar(50) NOT NULL,
  `companyid` varchar(50) NOT NULL,
  `owner` varchar(50) NOT NULL,
  `creator` varchar(50) NOT NULL,
  `projectname` varchar(50) NOT NULL,
  `reference` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'inactive',
  `groupid` varchar(50) DEFAULT 'na'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_budget`
--

CREATE TABLE `tbl_project_budget` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `itemid` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `capexcost` float NOT NULL,
  `opexcost` float NOT NULL,
  `vendor` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_budget_forecast`
--

CREATE TABLE `tbl_project_budget_forecast` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `resourceid` varchar(50) NOT NULL,
  `mapaccid` varchar(50) DEFAULT NULL,
  `year` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `m1` float NOT NULL,
  `m2` float NOT NULL,
  `m3` float NOT NULL,
  `m4` float NOT NULL,
  `m5` float NOT NULL,
  `m6` float NOT NULL,
  `m7` float NOT NULL,
  `m8` float NOT NULL,
  `m9` float NOT NULL,
  `m10` float NOT NULL,
  `m11` float NOT NULL,
  `m12` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_budget_lumpsum`
--

CREATE TABLE `tbl_project_budget_lumpsum` (
  `id` varchar(50) NOT NULL,
  `budgetid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `mapaccid` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `payment` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_budget_manhours`
--

CREATE TABLE `tbl_project_budget_manhours` (
  `id` varchar(50) NOT NULL,
  `budgetid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `hours` float NOT NULL,
  `rate` float NOT NULL,
  `weeks` float DEFAULT NULL,
  `trips` float DEFAULT NULL,
  `distance` float DEFAULT NULL,
  `distancerate` float DEFAULT NULL,
  `triphours` float DEFAULT NULL,
  `triphoursrate` float DEFAULT NULL,
  `fixedrate` float DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_budget_material`
--

CREATE TABLE `tbl_project_budget_material` (
  `id` varchar(50) NOT NULL,
  `budgetid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `unit` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_budget_milestone`
--

CREATE TABLE `tbl_project_budget_milestone` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `budgetid` varchar(50) NOT NULL,
  `resourceid` varchar(50) NOT NULL,
  `milestoneid` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `value` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_budget_upload`
--

CREATE TABLE `tbl_project_budget_upload` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `budgetid` varchar(50) NOT NULL,
  `link` varchar(500) NOT NULL,
  `filename` varchar(200) NOT NULL,
  `costing` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--------------------------------------------------------

--
-- Table structure for table `tbl_project_connect`
--

CREATE TABLE `tbl_project_connect` (
  `projectid` varchar(50) NOT NULL,
  `id` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_group`
--

CREATE TABLE `tbl_project_group` (
  `id` varchar(50) NOT NULL,
  `ownerid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_info`
--

CREATE TABLE `tbl_project_info` (
  `projectid` varchar(50) NOT NULL,
  `pi_5` varchar(50) DEFAULT NULL,
  `pi_6` varchar(50) DEFAULT NULL,
  `pi_8` varchar(50) DEFAULT NULL,
  `pi_9` varchar(50) DEFAULT NULL,
  `pi_10` varchar(50) DEFAULT NULL,
  `pi_11` varchar(50) DEFAULT NULL,
  `pi_12` varchar(50) DEFAULT NULL,
  `pi_13` varchar(50) DEFAULT NULL,
  `pi_14` varchar(50) DEFAULT NULL,
  `pi_15` varchar(50) DEFAULT NULL,
  `pi_16_1` varchar(50) DEFAULT NULL,
  `pi_16_4` varchar(50) DEFAULT NULL,
  `pi_16_5` varchar(50) DEFAULT NULL,
  `pi_16_6` varchar(50) DEFAULT NULL,
  `pi_16_7` varchar(50) DEFAULT NULL,
  `pi_16_8` varchar(50) DEFAULT NULL,
  `pi_16_9` varchar(50) DEFAULT NULL,
  `pi_16_10` varchar(50) DEFAULT NULL,
  `pi_16_11` varchar(50) DEFAULT NULL,
  `pi_16_12` varchar(50) DEFAULT NULL,
  `pi_16_13` varchar(10) DEFAULT NULL,
  `pi_16_1_lock` varchar(10) DEFAULT NULL,
  `pi_16_4_lock` varchar(10) DEFAULT NULL,
  `pi_16_5_lock` varchar(10) DEFAULT NULL,
  `pi_16_6_lock` varchar(10) DEFAULT NULL,
  `pi_16_7_lock` varchar(10) DEFAULT NULL,
  `pi_16_8_lock` varchar(10) DEFAULT NULL,
  `pi_16_9_lock` varchar(10) DEFAULT NULL,
  `pi_16_10_lock` varchar(10) DEFAULT NULL,
  `pi_16_11_lock` varchar(10) DEFAULT NULL,
  `pi_16_12_lock` varchar(10) DEFAULT NULL,
  `pi_16_13_lock` varchar(10) DEFAULT NULL,
  `pi_16_1_report` varchar(50) DEFAULT NULL,
  `pi_16_1_upload` varchar(50) DEFAULT NULL,
  `pi_16_1_link` varchar(50) DEFAULT NULL,
  `pi_16_1_note` varchar(100) DEFAULT NULL,
  `pi_16_4_report` varchar(50) DEFAULT NULL,
  `pi_16_4_upload` varchar(50) DEFAULT NULL,
  `pi_16_4_link` varchar(50) DEFAULT NULL,
  `pi_16_4_note` varchar(100) DEFAULT NULL,
  `pi_16_5_report` varchar(50) DEFAULT NULL,
  `pi_16_5_upload` varchar(50) DEFAULT NULL,
  `pi_16_5_link` varchar(50) DEFAULT NULL,
  `pi_16_5_note` varchar(100) DEFAULT NULL,
  `pi_16_6_report` varchar(50) DEFAULT NULL,
  `pi_16_6_upload` varchar(50) DEFAULT NULL,
  `pi_16_6_link` varchar(50) DEFAULT NULL,
  `pi_16_6_note` varchar(100) DEFAULT NULL,
  `pi_16_7_report` varchar(50) DEFAULT NULL,
  `pi_16_7_upload` varchar(50) DEFAULT NULL,
  `pi_16_7_link` varchar(50) DEFAULT NULL,
  `pi_16_7_note` varchar(100) DEFAULT NULL,
  `pi_16_8_report` varchar(50) DEFAULT NULL,
  `pi_16_8_upload` varchar(50) DEFAULT NULL,
  `pi_16_8_link` varchar(50) DEFAULT NULL,
  `pi_16_8_note` varchar(100) DEFAULT NULL,
  `pi_16_9_report` varchar(50) DEFAULT NULL,
  `pi_16_9_upload` varchar(50) DEFAULT NULL,
  `pi_16_9_link` varchar(50) DEFAULT NULL,
  `pi_16_9_note` varchar(100) DEFAULT NULL,
  `pi_16_10_report` varchar(50) DEFAULT NULL,
  `pi_16_10_upload` varchar(50) DEFAULT NULL,
  `pi_16_10_link` varchar(50) DEFAULT NULL,
  `pi_16_10_note` varchar(100) DEFAULT NULL,
  `pi_16_11_report` varchar(50) DEFAULT NULL,
  `pi_16_11_upload` varchar(50) DEFAULT NULL,
  `pi_16_11_link` varchar(50) DEFAULT NULL,
  `pi_16_11_note` varchar(100) DEFAULT NULL,
  `pi_16_12_report` varchar(50) DEFAULT NULL,
  `pi_16_12_upload` varchar(50) DEFAULT NULL,
  `pi_16_12_link` varchar(50) DEFAULT NULL,
  `pi_16_12_note` varchar(100) DEFAULT NULL,
  `pi_16_13_link` varchar(50) NOT NULL,
  `pi_16_13_note` varchar(50) NOT NULL,
  `pi_16_13_report` varchar(50) NOT NULL,
  `pi_16_13_upload` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_invoice`
--

CREATE TABLE `tbl_project_invoice` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `supplierid` varchar(50) NOT NULL,
  `budgetid` varchar(50) NOT NULL,
  `invoicedate` date NOT NULL,
  `invoicedetail` varchar(200) NOT NULL,
  `invoicenumber` varchar(100) NOT NULL,
  `exchangerate` varchar(50) NOT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_invoice_expense`
--

CREATE TABLE `tbl_project_invoice_expense` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `invoiceid` varchar(50) NOT NULL,
  `resourceid` varchar(50) NOT NULL,
  `weeks` float NOT NULL,
  `trips` float NOT NULL,
  `distance` float NOT NULL,
  `distancerate` float NOT NULL,
  `triphours` float NOT NULL,
  `triphoursrate` float NOT NULL,
  `fixedrate` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_invoice_forecast`
--

CREATE TABLE `tbl_project_invoice_forecast` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `resourceid` varchar(50) NOT NULL,
  `year` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `m1` float NOT NULL,
  `m2` float NOT NULL,
  `m3` float NOT NULL,
  `m4` float NOT NULL,
  `m5` float NOT NULL,
  `m6` float NOT NULL,
  `m7` float NOT NULL,
  `m8` float NOT NULL,
  `m9` float NOT NULL,
  `m10` float NOT NULL,
  `m11` float NOT NULL,
  `m12` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_invoice_lumpsum`
--

CREATE TABLE `tbl_project_invoice_lumpsum` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `invoiceid` varchar(50) NOT NULL,
  `milestoneid` varchar(50) NOT NULL,
  `amount` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_invoice_manhours`
--

CREATE TABLE `tbl_project_invoice_manhours` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `invoiceid` varchar(50) NOT NULL,
  `resourceid` varchar(50) NOT NULL,
  `hours` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_invoice_material`
--

CREATE TABLE `tbl_project_invoice_material` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `invoiceid` varchar(50) NOT NULL,
  `materialid` varchar(50) NOT NULL,
  `amount` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_invoice_milestone`
--

CREATE TABLE `tbl_project_invoice_milestone` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `invoiceid` varchar(50) NOT NULL,
  `milestoneid` varchar(50) NOT NULL,
  `resourceid` varchar(50) NOT NULL,
  `hours` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_invoice_upload`
--

CREATE TABLE `tbl_project_invoice_upload` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `invoiceid` varchar(50) NOT NULL,
  `link` varchar(200) NOT NULL,
  `filename` varchar(200) NOT NULL,
  `costing` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_item`
--

CREATE TABLE `tbl_project_item` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `categoryid` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_item_category`
--

CREATE TABLE `tbl_project_item_category` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_minutes`
--

CREATE TABLE `tbl_project_minutes` (
  `id` varchar(50) NOT NULL,
  `partid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `ownerid` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `subject` varchar(200) NOT NULL,
  `type` varchar(50) NOT NULL,
  `mode` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL,
  `attendees` varchar(200) NOT NULL,
  `responsible` varchar(50) NOT NULL,
  `respotype` varchar(50) NOT NULL,
  `respohours` varchar(50) NOT NULL,
  `due` date DEFAULT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_minutes_dist`
--

CREATE TABLE `tbl_project_minutes_dist` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `partid` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_prereq`
--

CREATE TABLE `tbl_project_prereq` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL,
  `docnum` varchar(200) NOT NULL,
  `comments` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_product`
--

CREATE TABLE `tbl_project_product` (
  `productid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `productname` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_register`
--

CREATE TABLE `tbl_project_register` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `ownerid` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `subject` varchar(300) NOT NULL,
  `type` varchar(50) NOT NULL,
  `mode` varchar(50) NOT NULL,
  `impact` varchar(50) NOT NULL,
  `impdescription` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_request`
--

CREATE TABLE `tbl_project_request` (
  `requestid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'idle',
  `lockstatus` tinyint(1) DEFAULT '0',
  `score` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `location1` varchar(200) NOT NULL,
  `location2` varchar(200) NOT NULL,
  `requestor` varchar(50) NOT NULL,
  `manager` varchar(50) NOT NULL,
  `sponsor` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_request_connect`
--

CREATE TABLE `tbl_project_request_connect` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `accid` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `notes` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_request_lock`
--

CREATE TABLE `tbl_project_request_lock` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `api` varchar(50) NOT NULL,
  `parameter` varchar(1000) NOT NULL,
  `type` varchar(50) NOT NULL,
  `operation` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_request_score`
--

CREATE TABLE `tbl_project_request_score` (
  `requestid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `desc_1` int(11) DEFAULT NULL,
  `desc_2` int(11) DEFAULT NULL,
  `desc_3` int(11) DEFAULT NULL,
  `desc_4_1` int(11) DEFAULT NULL,
  `desc_4_2` int(11) DEFAULT NULL,
  `prior_1` int(11) DEFAULT NULL,
  `prior_2` int(11) DEFAULT NULL,
  `prior_3` int(11) DEFAULT NULL,
  `prior_4` int(11) DEFAULT NULL,
  `prior_5` int(11) DEFAULT NULL,
  `prior_6` int(11) DEFAULT NULL,
  `prior_7` int(11) DEFAULT NULL,
  `prior_8` int(11) DEFAULT NULL,
  `strat_1` int(11) DEFAULT NULL,
  `strat_2` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_request_score_add`
--

CREATE TABLE `tbl_project_request_score_add` (
  `id` varchar(50) NOT NULL,
  `requestid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_request_technical`
--

CREATE TABLE `tbl_project_request_technical` (
  `requestid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `desc_1` varchar(500) NOT NULL,
  `desc_2` varchar(500) NOT NULL,
  `desc_3` varchar(500) NOT NULL,
  `desc_4_1` varchar(500) NOT NULL,
  `desc_4_2` varchar(500) NOT NULL,
  `prior_1` varchar(500) NOT NULL,
  `prior_2` varchar(500) NOT NULL,
  `prior_3` varchar(500) NOT NULL,
  `prior_4` varchar(500) NOT NULL,
  `prior_5` varchar(500) NOT NULL,
  `prior_6` varchar(500) NOT NULL,
  `prior_7` varchar(500) NOT NULL,
  `prior_8` varchar(500) NOT NULL,
  `strat_1` varchar(500) NOT NULL,
  `strat_2` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_request_technical_add`
--

CREATE TABLE `tbl_project_request_technical_add` (
  `id` varchar(50) NOT NULL,
  `requestid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `param` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_timesheet`
--

CREATE TABLE `tbl_project_timesheet` (
  `id` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `ownerid` varchar(50) NOT NULL,
  `taskid` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `hours` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skid`
--

CREATE TABLE `tbl_skid` (
  `id` varchar(30) NOT NULL,
  `comid` varchar(30) NOT NULL,
  `owner` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skid_equipment_specs`
--

CREATE TABLE `tbl_skid_equipment_specs` (
  `id` varchar(11) NOT NULL,
  `tag` varchar(30) NOT NULL,
  `quantity` varchar(30) NOT NULL,
  `capacity` varchar(30) NOT NULL,
  `tank` varchar(30) NOT NULL,
  `room` varchar(30) NOT NULL,
  `dimensions` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skid_equipment_specs_cost`
--

CREATE TABLE `tbl_skid_equipment_specs_cost` (
  `id` varchar(30) NOT NULL,
  `cost` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skid_operations`
--

CREATE TABLE `tbl_skid_operations` (
  `id` varchar(50) NOT NULL,
  `comid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skid_suboperations`
--

CREATE TABLE `tbl_skid_suboperations` (
  `id` varchar(50) NOT NULL,
  `main` varchar(50) NOT NULL,
  `comid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_skid_unit_specs`
--

CREATE TABLE `tbl_skid_unit_specs` (
  `id` varchar(30) NOT NULL,
  `tag` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier`
--

CREATE TABLE `tbl_supplier` (
  `supplierid` varchar(50) NOT NULL,
  `companyid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier_rate`
--

CREATE TABLE `tbl_supplier_rate` (
  `id` varchar(50) NOT NULL,
  `supplierid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `rate` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier_tmp`
--

CREATE TABLE `tbl_supplier_tmp` (
  `id` varchar(50) NOT NULL,
  `mapsupid` varchar(50) DEFAULT NULL,
  `projectid` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_task`
--

CREATE TABLE `tbl_task` (
  `taskid` varchar(50) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `planid` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'idle',
  `taskname` varchar(100) NOT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_task_resource`
--

CREATE TABLE `tbl_task_resource` (
  `id` varchar(50) NOT NULL,
  `type` varchar(30) NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `planid` varchar(50) NOT NULL,
  `taskid` varchar(50) NOT NULL,
  `accid` varchar(50) DEFAULT NULL,
  `mapaccid` varchar(50) DEFAULT NULL,
  `supplierid` varchar(50) DEFAULT NULL,
  `hours` int(200) DEFAULT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'idle',
  `suggesteddate` date DEFAULT NULL,
  `assignment` varchar(30) NOT NULL DEFAULT 'ok',
  `usercomment` varchar(500) DEFAULT NULL,
  `pmcomment` varchar(500) DEFAULT NULL,
  `usrread` varchar(30) DEFAULT NULL,
  `pmread` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_account`
--
ALTER TABLE `tbl_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_account_machine`
--
ALTER TABLE `tbl_account_machine`
  ADD PRIMARY KEY (`machineid`);

--
-- Indexes for table `tbl_account_rate`
--
ALTER TABLE `tbl_account_rate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_account_role`
--
ALTER TABLE `tbl_account_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_account_supervisor`
--
ALTER TABLE `tbl_account_supervisor`
  ADD PRIMARY KEY (`accid`);

--
-- Indexes for table `tbl_account_tmp`
--
ALTER TABLE `tbl_account_tmp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_alert`
--
ALTER TABLE `tbl_alert`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_company`
--
ALTER TABLE `tbl_company`
  ADD PRIMARY KEY (`companyid`);

--
-- Indexes for table `tbl_department`
--
ALTER TABLE `tbl_department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_document`
--
ALTER TABLE `tbl_document`
  ADD PRIMARY KEY (`docid`);

--
-- Indexes for table `tbl_document_bank`
--
ALTER TABLE `tbl_document_bank`
  ADD PRIMARY KEY (`docid`);

--
-- Indexes for table `tbl_document_category`
--
ALTER TABLE `tbl_document_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_document_history`
--
ALTER TABLE `tbl_document_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_group`
--
ALTER TABLE `tbl_group`
  ADD PRIMARY KEY (`groupid`);

--
-- Indexes for table `tbl_planning_document`
--
ALTER TABLE `tbl_planning_document`
  ADD PRIMARY KEY (`docid`);

--
-- Indexes for table `tbl_position`
--
ALTER TABLE `tbl_position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD PRIMARY KEY (`projectid`);

--
-- Indexes for table `tbl_project_budget`
--
ALTER TABLE `tbl_project_budget`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_budget_forecast`
--
ALTER TABLE `tbl_project_budget_forecast`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_budget_lumpsum`
--
ALTER TABLE `tbl_project_budget_lumpsum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_budget_manhours`
--
ALTER TABLE `tbl_project_budget_manhours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_budget_material`
--
ALTER TABLE `tbl_project_budget_material`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_budget_milestone`
--
ALTER TABLE `tbl_project_budget_milestone`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_budget_upload`
--
ALTER TABLE `tbl_project_budget_upload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_group`
--
ALTER TABLE `tbl_project_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_info`
--
ALTER TABLE `tbl_project_info`
  ADD PRIMARY KEY (`projectid`);

--
-- Indexes for table `tbl_project_invoice`
--
ALTER TABLE `tbl_project_invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_invoice_forecast`
--
ALTER TABLE `tbl_project_invoice_forecast`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_invoice_material`
--
ALTER TABLE `tbl_project_invoice_material`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_invoice_milestone`
--
ALTER TABLE `tbl_project_invoice_milestone`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_invoice_upload`
--
ALTER TABLE `tbl_project_invoice_upload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_item`
--
ALTER TABLE `tbl_project_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_item_category`
--
ALTER TABLE `tbl_project_item_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_minutes`
--
ALTER TABLE `tbl_project_minutes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_minutes_dist`
--
ALTER TABLE `tbl_project_minutes_dist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_prereq`
--
ALTER TABLE `tbl_project_prereq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_product`
--
ALTER TABLE `tbl_project_product`
  ADD PRIMARY KEY (`productid`);

--
-- Indexes for table `tbl_project_register`
--
ALTER TABLE `tbl_project_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_request`
--
ALTER TABLE `tbl_project_request`
  ADD PRIMARY KEY (`requestid`);

--
-- Indexes for table `tbl_project_request_connect`
--
ALTER TABLE `tbl_project_request_connect`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_request_lock`
--
ALTER TABLE `tbl_project_request_lock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_request_score`
--
ALTER TABLE `tbl_project_request_score`
  ADD PRIMARY KEY (`requestid`);

--
-- Indexes for table `tbl_project_request_score_add`
--
ALTER TABLE `tbl_project_request_score_add`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_request_technical`
--
ALTER TABLE `tbl_project_request_technical`
  ADD PRIMARY KEY (`requestid`);

--
-- Indexes for table `tbl_project_request_technical_add`
--
ALTER TABLE `tbl_project_request_technical_add`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project_timesheet`
--
ALTER TABLE `tbl_project_timesheet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_skid`
--
ALTER TABLE `tbl_skid`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_skid_operations`
--
ALTER TABLE `tbl_skid_operations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_skid_suboperations`
--
ALTER TABLE `tbl_skid_suboperations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_supplier`
--
ALTER TABLE `tbl_supplier`
  ADD PRIMARY KEY (`supplierid`);

--
-- Indexes for table `tbl_supplier_rate`
--
ALTER TABLE `tbl_supplier_rate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_supplier_tmp`
--
ALTER TABLE `tbl_supplier_tmp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_task`
--
ALTER TABLE `tbl_task`
  ADD PRIMARY KEY (`taskid`);

--
-- Indexes for table `tbl_task_resource`
--
ALTER TABLE `tbl_task_resource`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
