/* SYSP.H - include-䠩� ��� �ਬ�஢, �ਢ������� � ����� */



/**
*.Name      FP_MAKE
*
*.Title     ���� ��� ��⠢����� FAR-㪠��⥫�
*
*.Descr     ���� ��⠢��� FAR-㪠��⥫�, ��������
*           ���祭�ﬨ ᥣ���� � ᬥ饭��
*
*.Params    FP_MAKE(seg,off)
*              seg - ᥣ����;
*              off - ᬥ饭��
*
*.Return    FAR-㪠��⥫� seg:off
**/


#define FP_MAKE(seg,off) ((void far *)                         \
					((((unsigned long) (unsigned)(seg)) << 16L) |   \
					((unsigned long) (unsigned) (off))))


/* ������� ����୮� ⠡���� �裡 DOS */

#pragma pack(1)

typedef struct _CVT_ {
	unsigned mcb_seg;
	void far *dev_cb;
	void far *file_tab;
	void far *clock_dr;
	void far *con_dr;
	unsigned max_btbl;
	void far *disk_buf;
	void far *drv_info;
	void far *fcb_tabl;
	unsigned fcb_size;
	unsigned char num_bdev;
	unsigned char lastdriv;
} CVT;


/* ���� �ࠢ����� ������� MCB */

typedef struct _MCB_ {
	unsigned char type;
	unsigned owner;
	unsigned size;
	char reserve[11];
} MCB;

/* ��䨪� �ணࠬ����� ᥣ���� PSP */

typedef struct _PSP_ {
	unsigned char int20h[2];
	unsigned mem_top;
	unsigned char reserv1;
	unsigned char call_dsp[5];
	void far *term_adr;
	void far *cbrk_adr;
	void far *crit_err;
	unsigned parn_psp;
	unsigned char file_tab[20];
	unsigned env_seg;
	void far *ss_sp;
	unsigned max_open;
	void far *file_tba;
	unsigned char reserv2[24];
	unsigned char disp[3];
	unsigned char reserv3[9];
	unsigned char fcb1[16];
	unsigned char fcb2[20];
	unsigned char p_size;
	unsigned char parm[127];
} PSP;


/* ���� �ࠢ����� ���ன�⢮� DOS */

typedef struct _DDCB_ {
	unsigned char drv_num;
	unsigned char drv_numd;
	unsigned sec_size;
	unsigned char clu_size;
	unsigned char clu_base;
	unsigned boot_siz;
	unsigned char fat_num;
	unsigned max_dir;
	unsigned data_sec;
	unsigned hi_clust;
	unsigned char fat_size;
	char reserv1;
	unsigned root_sec;
	void far *drv_addr;
	unsigned char media;
	unsigned char acc_flag;
	struct _DDCB_ far *next;
	unsigned reserv2;
	unsigned built;
} DDCB;

/* ��ࠢ���騩 ���� DOS ��� 䠩��� */

typedef struct _DFCB_ {
	unsigned handl_num;
	unsigned char access_mode;
	unsigned reserv1;
	unsigned dev_info;
	void far *driver;
	unsigned first_clu;
	unsigned time;
	unsigned date;
	unsigned long fl_size;
	unsigned long offset;
	unsigned reserv2;
	unsigned reserv7;
	unsigned reserv3;
	char reserv4;
	char filename[11];
	char reserv5[6];
	unsigned ownr_psp;
	unsigned reserv6;
	unsigned last_clu;
	char reserv8[4];
} DFCB;

/* ������ 䠩��� DOS */

typedef struct _DFT_ {
	struct _DFT_ far *next;
	unsigned file_count;
	DFCB dfcb;
} DFT;


/* ��ࠢ���騩 ���� ��᪮���� ���� BCB */

typedef struct _BCB_ {
	struct _BCB_ far *next;
	unsigned char drive;
	unsigned char flag;
	unsigned sect_num;
	unsigned reserv1;
	DDCB far *ddcb;
	unsigned reserv2;
} BCB;

/* ���ଠ�� � ��᪥ */

typedef struct _DINFO_ {
	char path[64];
	unsigned reserv1;
	unsigned reserv2;
	unsigned char reserv3;
	DDCB far *ddcb;
	unsigned cdir_clu;
	unsigned reserv4;
	unsigned reserv5;
	unsigned reserv6;
	unsigned char reserv7[7];
} DINFO;


/* ��������� EXE-�ணࠬ�� */

typedef struct _EXE_HDR_ {
	unsigned signature;
	unsigned part_pag;
	unsigned file_size;
	unsigned rel_item;
	unsigned hdr_size;
	unsigned min_mem;
	unsigned max_mem;
	unsigned ss_reg;
	unsigned sp_reg;
	unsigned chk_summ;
	unsigned ip_reg;
	unsigned cs_reg;
	unsigned relt_off;
	unsigned overlay;
} EXE_HDR;


/* ⠡��� �ᯮ������� ᥣ���⮢ EXE-�ணࠬ�� */

typedef struct _RELOC_TAB_ {
	unsigned offset;
	unsigned segment;
} RELOC_TAB;


/* ���䨣���� ��᪮��� �����⥬� */

typedef struct _DISK_CONFIG_ {
	int  n_floppy;
	int  n_hard;
	int  t_floppy1;
	int  t_floppy2;
	int  t_hard1;
	int  t_hard2;
} DISK_CONFIG;


/* ⠡��� ��ࠬ��஢ ��᪥�� */

typedef struct _DPT_ {
	unsigned char srt_hut;
	unsigned char dma_hlt;
	unsigned char motor_w;
	unsigned char sec_size;
	unsigned char eot;
	unsigned char gap_rw;
	unsigned char dtl;
	unsigned char gap_f;
	unsigned char fill_char;
	unsigned char hst;
	unsigned char mot_start;
} DPT;

/* ⠡��� ��ࠬ��஢ ��᪠ */

typedef struct _HDPT_ {
	unsigned max_cyl;
	unsigned char max_head;
	unsigned srwcc;
	unsigned swpc;
	unsigned char max_ecc;
	unsigned char dstopt;
	unsigned char st_del;
	unsigned char fm_del;
	unsigned char chk_del;
	unsigned char reserve[4];
} HDPT;

/* ������� ⠡���� ࠧ����� */

typedef struct _PART_ENTRY_ {
	unsigned char flag;
	unsigned char beg_head;
	unsigned beg_sec_cyl;
	unsigned char sys;
	unsigned char end_head;
	unsigned end_sec_cyl;
	unsigned long rel_sec;
	unsigned long size;
} PART_ENTRY;

/* ������� ����㧮筠� ������ */

typedef struct _MBOOT_ {
	char boot_prg[0x1be];
	PART_ENTRY part_table[4];
	unsigned char signature[2];
} MBOOT;

/* ����७�� ���� ��ࠬ��஢ BIOS */

typedef struct _EBPB_ {
	unsigned sectsize;
	char clustsize;
	unsigned ressecs;
	char fatcnt;
	unsigned rootsize;
	unsigned totsecs;
	char media;
	unsigned fatsize;
	unsigned seccnt;
	unsigned headcnt;
	unsigned hiddensec_low;
	unsigned hiddensec_hi;
	unsigned long drvsecs;
} EBPB;

/* ����㧮筠� ������ ��� MS-DOS 4.01 */

typedef struct _BOOT_ {
	char jmp[3];
	char oem[8];
	EBPB bpb;
	char drive;
	char reserved;
	char signature;
	unsigned volser_lo;
	unsigned volser_hi;
	char label[11];
	char fat_format[8];
	char boot_code[450];

} BOOT;

/* �६� ��᫥����� ���������� 䠩�� */

typedef struct _FTIME_ {
	unsigned sec : 5, min : 6, hour : 5;
} FTIME;

/* ��� ��᫥����� ���������� 䠩�� */

typedef struct _FDATE_ {
	unsigned day : 5, month : 4, year : 7;
} FDATE;

/* ���ਯ�� 䠩�� � ��⠫��� */

typedef struct _FITEM_ {
	char name[8];
	char ext[3];
	char attr;
	char reserved[10];
	FTIME time;
	FDATE date;
	unsigned cluster_nu;
	unsigned long size;
} FITEM;

/* ��ଠ� �४� ��� GENERIC IOCTL */

typedef struct _TRK_LY_ {
	unsigned no;
	unsigned size;
} TRK_LY;

/* ��ࠬ���� ���ன�⢠ ��� GENERIC IOCTL */

typedef struct _DPB_ {

	char spec;
	char devtype;
	unsigned devattr;
	unsigned numofcyl;
	char media_type;

	EBPB bpb;
	char reserved[6];

	unsigned trkcnt;
	TRK_LY trk[100];

} DPB;

/* ��ࠬ���� ��� �ଠ�஢���� �㭪樥� GENERIC IOCTL */

typedef struct _DPB_FORMAT_ {

	char spec;
	unsigned head;
	unsigned track;

} DPB_FORMAT;


/* ��ࠬ���� ��� �⥭��/����� �㭪樥� GENERIC IOCTL */

typedef struct _DPB_WR_ {

	char spec;
	unsigned head;
	unsigned track;
	unsigned sector;
	unsigned sectcnt;
	void _far *buffer;

} DPB_WR;

/* �����䨪��� BIOS */

typedef struct _BIOS_ID_ {

	char date[8];
	unsigned reserve;
	char pc_type;

} BIOS_ID;

// ����ﭨ� ���

typedef struct _MOUSE_STATE_ {

	unsigned bottoms;
	unsigned x;
	unsigned y;

} MOUSE_STATE;

typedef struct _SYSTIMER_ {

	char hour;
	char min;
	char sec;
	unsigned year;
	char month;
	char day;
	char daylight_savings;

} SYSTIMER;

#pragma pack()



void far *get_cvt(void); /* ������� ���� ����୮� ⠡���� �裡 */
CVT  far *get_mcvt(void); /* ������� ���� ����୮� ⠡���� �裡 */

MCB  far *get_fmcb(CVT far *); /* ������� ���� ��ࢮ�� MCB */
MCB  far *get_nmcb(MCB far *); /* ������� ���� ᫥���饣� MCB */

DDCB  far *get_fddcb(CVT far *); /* ������� ���� ��ࢮ�� DDCB */
DDCB  far *get_nddcb(DDCB far *); /* ������� ���� ᫥���饣� DDCB */
DDCB  far *get_ddcb(unsigned char); /* ������� ���� DDCB ��� ��᪠ */

DFT  far *get_fdft(CVT far *); /* ������� ���� ��ࢮ� DFT */
DFT  far *get_ndft(DFT far *); /* ������� ���� ᫥���饩 DFT */

BCB  far *get_fbcb(CVT far *); /* ������� ���� ��ࢮ�� BCB */
BCB  far *get_nbcb(BCB far *); /* ������� ���� ᫥���饣� BCB */

int get_exeh(EXE_HDR *, RELOC_TAB **, FILE *); /* ������ ��������� EXE */

char unsigned pc_model(void); /* ������� ������ �������� */
void disk_cfg(DISK_CONFIG*);  /* ��।����� ���䨣����
							  ��᪮��� �����⥬� */
DPT _far *get_dpt(void);      /* ������� ���� DPT  */
HDPT _far *get_hdp1(void);      /* ������� ���� ��ࢮ� HDPT  */
HDPT _far *get_hdp2(void);      /* ������� ���� ��ன HDPT  */


BIOS_ID _far *getbiosi(void);   /* ������� ���� �����䨪��� BIOS */


int   ms_init(int *);           // ���樠������ ���
void  ms_on(void);              // ����祭�� �����
void  ms_off(void);             // �몫�祭�� �����
void  ms_setcr(int, int);       // ��⠭���� �����
int   ms_querp(MOUSE_STATE *, int); // ��।������ ���ﭨ� ���
									// �� ����⨨ �� �������
void  ms_rangx(int xmin, int xmax); // ������ �������� ��६�饭�� �����
									// �� ��ਧ��⠫�
void  ms_rangy(int ymin, int ymax); // ������ �������� ��६�饭�� �����
									// �� ���⨪���
void  ms_gform(int xt, int yt, char _far *form); // ��।������ ��� �����
												 // � ����᪮� ०���
void ms_tform(int type, int mask1, int mask2);   // ��।������ ��� �����
												 // � ⥪�⮢�� ०���
MOUSE_STATE *ms_querm(MOUSE_STATE *state);  // ��।������ �⭮�⥫쭮��
											// ��६�饭�� � �����
void ms_seth(int mask, void (far *hand)());  // ��⠭���� �ࠩ��� ᮡ�⨩

											 // ���⥬�� ��� ॠ�쭮�� �६���

#define RTC_GET_TIME    2
#define RTC_SET_TIME    3
#define RTC_GET_DATE    4
#define RTC_SET_DATE    5
#define RTC_SET_ALARM   6
#define RTC_CLEAR_ALARM 7


int timer(char, SYSTIMER *); // ࠡ�� � �ᠬ� ॠ�쭮�� �६���
void tm_delay(int); // �ନ஢���� ����প� �� ⠩����
void tm_sound(int, int); // �ନ஢���� ⮭� ���������
						 // ���⥫쭮�� � �ᯮ�짮������
						 // ⠩���

void rnd_set(int);   // ���樠������ �������
					 // ��砩��� �ᥫ
int rnd_get(void);   // ����祭�� ��砩���� �᫠


typedef struct _AUX_MODE_ {

	union {

		struct {
			unsigned char  len : 2, // ����� ᨬ����
				stop : 1, // �᫮ �⮯-��⮢
				parity : 2, // ����஫� �⭮��
				stuck_parity : 1, // 䨪��� �⭮��
				en_break_ctl : 1, // ��⠭���� ����뢠
				dlab : 1; // ����㧪� ॣ���� ����⥫�
		} ctl_word;

		char ctl;

	} ctl_aux;

	unsigned long baud;            // ᪮���� ��।�� ������

} AUX_MODE;

int aux_init(AUX_MODE *, int, int); // ���樠������
									// �ᨭ�஭���� ������

void aux_stat(AUX_MODE *, int); // ��।������ ०���
								// �ᨭ�஭���� ������
void aux_outp(char, int);  // �뢮� ᨬ���� �
						   // �ᨭ�஭�� ������
char aux_inp(int); // ���� ᨬ���� �� �ᨭ�஭����
				   // ������

				   // ���⨯� �㭪権 ��� ࠡ��� � ���७���
				   // �������.

unsigned XMM_Installed();

long  XMM_Version(void);
long  XMM_RequestHMA(unsigned);
long  XMM_ReleaseHMA(void);
long  XMM_GlobalEnableA20(void);
long  XMM_GlobalDisableA20(void);
long  XMM_EnableA20(void);
long  XMM_DisableA20(void);
long  XMM_QueryA20(void);
long  XMM_QueryLargestFree(void);
long  XMM_QueryTotalFree(void);
long  XMM_AllocateExtended(unsigned);
long  XMM_FreeExtended(unsigned);
long  XMM_MoveExtended(struct XMM_Move *);
long  XMM_LockExtended(unsigned);
long  XMM_UnLockExtended(unsigned);
long  XMM_GetHandleLength(unsigned);
long  XMM_GetHandleInfo(unsigned);
long  XMM_ReallocateExtended(unsigned, unsigned);
long  XMM_RequestUMB(unsigned);
long  XMM_ReleaseUMB(unsigned);

struct   XMM_Move {
	unsigned long  Length;
	unsigned short SourceHandle;
	unsigned long  SourceOffset;
	unsigned short DestHandle;
	unsigned long  DestOffset;
};

// ���⨯� �㭪権 ��� ࠡ��� � �������⥫쭮�
// �������.

int ems_init(void);
int ems_stat(void);
int ems_fram(unsigned *);
int ems_page(unsigned *, unsigned *);
int ems_open(int, int *);
int ems_clos(int *);
int ems_map(int, int, int);
int ems_ver(char *);
